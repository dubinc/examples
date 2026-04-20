//
//  ViewController.swift
//  DubUIKitDemo
//
//  Created by Ian MacCallum on 9/17/25.
//

import UIKit

// MARK: - Products View Controller
class ProductsViewController: UIViewController {

    private var collectionView: UICollectionView!
    private var loadingView: UIView!
    private var activityIndicator: UIActivityIndicatorView!
    private var loadingLabel: UILabel!

    private var products: [Product] = []
    private let authManager = AuthManager.shared

    // Callbacks
    var onProductPurchased: ((Product, User) -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
        setupNotifications()
        loadProducts()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    private func setupUI() {
        title = "Products"
        view.backgroundColor = .systemBackground

        setupCollectionView()
        setupLoadingView()
        setupAuthButton()
    }

    private func setupCollectionView() {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        layout.minimumInteritemSpacing = 16
        layout.minimumLineSpacing = 16
        layout.sectionInset = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)

        collectionView = UICollectionView(frame: view.bounds, collectionViewLayout: layout)
        collectionView.delegate = self
        collectionView.dataSource = self
        collectionView.backgroundColor = .systemBackground
        collectionView.register(ProductCollectionViewCell.self, forCellWithReuseIdentifier: "ProductCell")
        collectionView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(collectionView)

        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    private func setupLoadingView() {
        loadingView = UIView()
        loadingView.backgroundColor = .systemBackground
        loadingView.translatesAutoresizingMaskIntoConstraints = false

        activityIndicator = UIActivityIndicatorView(style: .large)
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        activityIndicator.startAnimating()

        loadingLabel = UILabel()
        loadingLabel.text = "Loading Products..."
        loadingLabel.font = .systemFont(ofSize: 18, weight: .medium)
        loadingLabel.textColor = .secondaryLabel
        loadingLabel.translatesAutoresizingMaskIntoConstraints = false

        loadingView.addSubview(activityIndicator)
        loadingView.addSubview(loadingLabel)
        view.addSubview(loadingView)

        NSLayoutConstraint.activate([
            loadingView.topAnchor.constraint(equalTo: view.topAnchor),
            loadingView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            loadingView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            loadingView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            activityIndicator.centerXAnchor.constraint(equalTo: loadingView.centerXAnchor),
            activityIndicator.centerYAnchor.constraint(equalTo: loadingView.centerYAnchor, constant: -20),

            loadingLabel.topAnchor.constraint(equalTo: activityIndicator.bottomAnchor, constant: 20),
            loadingLabel.centerXAnchor.constraint(equalTo: loadingView.centerXAnchor)
        ])
    }

    private func setupAuthButton() {
        updateAuthButton()
    }

    private func updateAuthButton() {
        if authManager.isAuthenticated, let user = authManager.currentUser {
            // Show profile picture
            let profileButton = UIButton(type: .custom)
            profileButton.frame = CGRect(x: 0, y: 0, width: 32, height: 32)
            profileButton.layer.cornerRadius = 16
            profileButton.clipsToBounds = true
            profileButton.addTarget(self, action: #selector(authButtonTapped), for: .touchUpInside)

            NSLayoutConstraint.activate([
                profileButton.heightAnchor.constraint(equalToConstant: 32),
                profileButton.widthAnchor.constraint(equalToConstant: 32)
            ])

            // Load profile image
            if let imageURL = URL(string: user.image) {
                URLSession.shared.dataTask(with: imageURL) { [weak profileButton] data, _, _ in
                    guard let data = data, let image = UIImage(data: data) else { return }
                    DispatchQueue.main.async {
                        profileButton?.setImage(image, for: .normal)
                    }
                }.resume()
            }

            navigationItem.rightBarButtonItem = UIBarButtonItem(customView: profileButton)
        } else {
            // Show login button
            let loginButton = UIButton(type: .system)
            loginButton.setTitle("Login", for: .normal)
            loginButton.titleLabel?.font = .systemFont(ofSize: 16, weight: .semibold)
            loginButton.setTitleColor(.white, for: .normal)
            loginButton.backgroundColor = .systemBlue
            loginButton.layer.cornerRadius = 20
            loginButton.frame = CGRect(x: 0, y: 0, width: 80, height: 40)
            loginButton.addTarget(self, action: #selector(authButtonTapped), for: .touchUpInside)

            navigationItem.rightBarButtonItem = UIBarButtonItem(customView: loginButton)
        }
    }

    @objc private func authButtonTapped() {
        if authManager.isAuthenticated {
            authManager.logout()
        } else {
            let authVC = AuthViewController()
            authVC.onUserAuthenticated = { [weak self] user in
                self?.dismiss(animated: true)
            }
            let navController = UINavigationController(rootViewController: authVC)
            present(navController, animated: true)
        }
    }

    private func setupNotifications() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(userDidLogin),
            name: .userDidLogin,
            object: nil
        )

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(userDidLogout),
            name: .userDidLogout,
            object: nil
        )
    }

    @objc private func userDidLogin() {
        DispatchQueue.main.async {
            self.updateAuthButton()
        }
    }

    @objc private func userDidLogout() {
        DispatchQueue.main.async {
            self.updateAuthButton()
        }
    }

    private func loadProducts() {
        Task {
            do {
                let products = try await APIService.shared.fetchProducts()
                self.products = products
                loadingView.isHidden = true
                collectionView.reloadData()
            } catch {
                print("Error loading products: \(error)")
                loadingView.isHidden = true
            }
        }
    }
}

// MARK: - Collection View Data Source & Delegate
extension ProductsViewController: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return products.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ProductCell", for: indexPath) as! ProductCollectionViewCell
        cell.configure(with: products[indexPath.item])
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let product = products[indexPath.item]
        let detailVC = ProductDetailViewController(product: product)
        detailVC.onProductPurchased = onProductPurchased
        let navController = UINavigationController(rootViewController: detailVC)
        present(navController, animated: true)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let padding: CGFloat = 16
        let availableWidth = collectionView.frame.width - (padding * 3)
        let width = availableWidth / 2
        return CGSize(width: width, height: width * 1.3)
    }
}

// MARK: - Product Collection View Cell
class ProductCollectionViewCell: UICollectionViewCell {

    private let imageView = UIImageView()
    private let titleLabel = UILabel()
    private let priceLabel = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupUI() {
        backgroundColor = .systemBackground
        layer.cornerRadius = 16
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOffset = CGSize(width: 0, height: 2)
        layer.shadowRadius = 8
        layer.shadowOpacity = 0.1

        // Image View
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 12
        imageView.backgroundColor = .systemGray6
        imageView.translatesAutoresizingMaskIntoConstraints = false

        // Title Label
        titleLabel.font = .systemFont(ofSize: 16, weight: .semibold)
        titleLabel.textColor = .label
        titleLabel.numberOfLines = 2
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        // Price Label
        priceLabel.font = .systemFont(ofSize: 18, weight: .bold)
        priceLabel.textColor = .darkText
        priceLabel.translatesAutoresizingMaskIntoConstraints = false

        contentView.addSubview(imageView)
        contentView.addSubview(titleLabel)
        contentView.addSubview(priceLabel)

        NSLayoutConstraint.activate([
            imageView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 12),
            imageView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 12),
            imageView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -12),
            imageView.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier: 0.8),

            titleLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 12),
            titleLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            titleLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),

            priceLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            priceLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
        ])
    }

    func configure(with product: Product) {
        titleLabel.text = product.title
        priceLabel.text = String(format: "$%.2f", product.price)

        // Load image
        if let url = URL(string: product.thumbnail) {
            URLSession.shared.dataTask(with: url) { [weak self] data, _, _ in
                guard let data = data, let image = UIImage(data: data) else { return }
                DispatchQueue.main.async {
                    self?.imageView.image = image
                }
            }.resume()
        }
    }
}


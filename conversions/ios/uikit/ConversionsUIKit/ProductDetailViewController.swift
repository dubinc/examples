//
//  ProductDetailViewController.swift
//  DubUIKitDemo
//
//  Created by Ian MacCallum on 9/18/25.
//

import UIKit
import Dub

// MARK: - Product Detail View Controller
class ProductDetailViewController: UIViewController {

    private let scrollView = UIScrollView()
    private let contentStackView = UIStackView()
    private let imageView = UIImageView()

    private let product: Product
    var onProductPurchased: ((Product, User) -> Void)?

    init(product: Product) {
        self.product = product
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        configureContent()
    }

    private func setupUI() {
        title = "Product Details"
        view.backgroundColor = .systemBackground

        navigationItem.rightBarButtonItem = UIBarButtonItem(
            barButtonSystemItem: .done,
            target: self,
            action: #selector(doneTapped)
        )

        setupScrollView()
        setupImageView()
        setupProductInfo()
        setupPurchaseButton()
    }

    private func setupScrollView() {
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        contentStackView.translatesAutoresizingMaskIntoConstraints = false
        
        contentStackView.axis = .vertical
        contentStackView.spacing = 20
        contentStackView.alignment = .fill
        contentStackView.distribution = .fill

        view.addSubview(scrollView)
        scrollView.addSubview(contentStackView)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            contentStackView.topAnchor.constraint(equalTo: scrollView.topAnchor, constant: 20),
            contentStackView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor, constant: 20),
            contentStackView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor, constant: -20),
            contentStackView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor, constant: -32),
            contentStackView.widthAnchor.constraint(equalTo: scrollView.widthAnchor, constant: -40)
        ])
    }

    private func setupImageView() {
        imageView.contentMode = .scaleAspectFit
        imageView.backgroundColor = .systemGray6
        imageView.layer.cornerRadius = 16
        imageView.clipsToBounds = true
        imageView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            imageView.heightAnchor.constraint(equalToConstant: 300)
        ])

        // Load image - use first image from array or thumbnail
        let imageURL = product.images.first ?? product.thumbnail
        if let url = URL(string: imageURL) {
            URLSession.shared.dataTask(with: url) { [weak self] data, _, _ in
                guard let data = data, let image = UIImage(data: data) else { return }
                DispatchQueue.main.async {
                    self?.imageView.image = image
                }
            }.resume()
        }
        
        contentStackView.addArrangedSubview(imageView)
    }

    private func setupProductInfo() {
        let infoStackView = UIStackView()
        infoStackView.axis = .vertical
        infoStackView.spacing = 16
        infoStackView.alignment = .fill
        infoStackView.distribution = .fill

        // Title
        let titleLabel = UILabel()
        titleLabel.text = product.title
        titleLabel.font = .systemFont(ofSize: 24, weight: .bold)
        titleLabel.numberOfLines = 0
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        // Rating and Stock
        let ratingStockStackView = UIStackView()
        ratingStockStackView.axis = .horizontal
        ratingStockStackView.distribution = .equalSpacing
        ratingStockStackView.alignment = .center

        let ratingLabel = UILabel()
        let stars = String(repeating: "★", count: Int(product.rating)) + String(repeating: "☆", count: 5 - Int(product.rating))
        ratingLabel.text = "\(stars) (\(String(format: "%.1f", product.rating)))"
        ratingLabel.font = .systemFont(ofSize: 14, weight: .medium)
        ratingLabel.textColor = .secondaryLabel
        ratingLabel.translatesAutoresizingMaskIntoConstraints = false

        let stockLabel = UILabel()
        stockLabel.text = "\(product.stock) in stock"
        stockLabel.font = .systemFont(ofSize: 14, weight: .medium)
        stockLabel.textColor = product.stock > 10 ? .systemGreen : .systemOrange
        stockLabel.translatesAutoresizingMaskIntoConstraints = false

        ratingStockStackView.addArrangedSubview(ratingLabel)
        ratingStockStackView.addArrangedSubview(stockLabel)

        // Price
        let priceStackView = UIStackView()
        priceStackView.axis = .horizontal
        priceStackView.spacing = 12
        priceStackView.alignment = .bottom

        let priceLabel = UILabel()
        priceLabel.text = String(format: "$%.2f", product.price)
        priceLabel.font = .systemFont(ofSize: 32, weight: .bold)
        priceLabel.textColor = .darkText
        priceLabel.translatesAutoresizingMaskIntoConstraints = false

        priceStackView.addArrangedSubview(priceLabel)

        if product.discountPercentage > 0 {
            let discountLabel = UILabel()
            discountLabel.text = "\(Int(product.discountPercentage))% OFF"
            discountLabel.font = .systemFont(ofSize: 12, weight: .bold)
            discountLabel.textColor = .white
            discountLabel.backgroundColor = .systemRed
            discountLabel.textAlignment = .center
            discountLabel.layer.cornerRadius = 6
            discountLabel.clipsToBounds = true
            discountLabel.translatesAutoresizingMaskIntoConstraints = false

            NSLayoutConstraint.activate([
                discountLabel.widthAnchor.constraint(equalToConstant: 70),
                discountLabel.heightAnchor.constraint(equalToConstant: 24)
            ])

            priceStackView.addArrangedSubview(discountLabel)
        }

        // Brand and Category
        let brandCategoryView = UIView()
        brandCategoryView.backgroundColor = UIColor.systemGray6
        brandCategoryView.layer.cornerRadius = 12
        brandCategoryView.translatesAutoresizingMaskIntoConstraints = false

        let brandCategoryStackView = UIStackView()
        brandCategoryStackView.axis = .horizontal
        brandCategoryStackView.distribution = .equalSpacing
        brandCategoryStackView.alignment = .fill
        brandCategoryStackView.translatesAutoresizingMaskIntoConstraints = false

        let brandStackView = UIStackView()
        brandStackView.axis = .vertical
        brandStackView.spacing = 4
        brandStackView.alignment = .leading

        let brandTitleLabel = UILabel()
        brandTitleLabel.text = "Brand"
        brandTitleLabel.font = .systemFont(ofSize: 12, weight: .medium)
        brandTitleLabel.textColor = .secondaryLabel
        brandTitleLabel.translatesAutoresizingMaskIntoConstraints = false

        let brandLabel = UILabel()
        brandLabel.text = product.brand
        brandLabel.font = .systemFont(ofSize: 16, weight: .semibold)
        brandLabel.translatesAutoresizingMaskIntoConstraints = false

        brandStackView.addArrangedSubview(brandTitleLabel)
        brandStackView.addArrangedSubview(brandLabel)

        let categoryStackView = UIStackView()
        categoryStackView.axis = .vertical
        categoryStackView.spacing = 4
        categoryStackView.alignment = .trailing

        let categoryTitleLabel = UILabel()
        categoryTitleLabel.text = "Category"
        categoryTitleLabel.font = .systemFont(ofSize: 12, weight: .medium)
        categoryTitleLabel.textColor = .secondaryLabel
        categoryTitleLabel.translatesAutoresizingMaskIntoConstraints = false

        let categoryLabel = UILabel()
        categoryLabel.text = product.category.capitalized
        categoryLabel.font = .systemFont(ofSize: 16, weight: .semibold)
        categoryLabel.translatesAutoresizingMaskIntoConstraints = false

        categoryStackView.addArrangedSubview(categoryTitleLabel)
        categoryStackView.addArrangedSubview(categoryLabel)

        brandCategoryStackView.addArrangedSubview(brandStackView)
        brandCategoryStackView.addArrangedSubview(categoryStackView)

        brandCategoryView.addSubview(brandCategoryStackView)

        NSLayoutConstraint.activate([
            brandCategoryStackView.topAnchor.constraint(equalTo: brandCategoryView.topAnchor, constant: 16),
            brandCategoryStackView.leadingAnchor.constraint(equalTo: brandCategoryView.leadingAnchor, constant: 16),
            brandCategoryStackView.trailingAnchor.constraint(equalTo: brandCategoryView.trailingAnchor, constant: -16),
            brandCategoryStackView.bottomAnchor.constraint(equalTo: brandCategoryView.bottomAnchor, constant: -16)
        ])

        // Description
        let descriptionStackView = UIStackView()
        descriptionStackView.axis = .vertical
        descriptionStackView.spacing = 8
        descriptionStackView.alignment = .fill

        let descriptionTitleLabel = UILabel()
        descriptionTitleLabel.text = "Description"
        descriptionTitleLabel.font = .systemFont(ofSize: 18, weight: .semibold)
        descriptionTitleLabel.translatesAutoresizingMaskIntoConstraints = false

        let descriptionLabel = UILabel()
        descriptionLabel.text = product.description
        descriptionLabel.font = .systemFont(ofSize: 16, weight: .regular)
        descriptionLabel.numberOfLines = 0
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false

        descriptionStackView.addArrangedSubview(descriptionTitleLabel)
        descriptionStackView.addArrangedSubview(descriptionLabel)

        // Add all to info stack view
        infoStackView.addArrangedSubview(titleLabel)
        infoStackView.addArrangedSubview(ratingStockStackView)
        infoStackView.addArrangedSubview(priceStackView)
        infoStackView.addArrangedSubview(brandCategoryView)
        infoStackView.addArrangedSubview(descriptionStackView)

        contentStackView.addArrangedSubview(infoStackView)
    }

    private func setupPurchaseButton() {
        let purchaseButton = UIButton(type: .system)
        purchaseButton.setTitle("Purchase product", for: .normal)
        purchaseButton.titleLabel?.font = .systemFont(ofSize: 18, weight: .semibold)
        purchaseButton.setTitleColor(.white, for: .normal)
        purchaseButton.backgroundColor = .systemBlue
        purchaseButton.layer.cornerRadius = 16
        purchaseButton.addTarget(self, action: #selector(purchaseButtonTapped), for: .touchUpInside)
        purchaseButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            purchaseButton.heightAnchor.constraint(equalToConstant: 56)
        ])

        contentStackView.addArrangedSubview(purchaseButton)
    }

    private func configureContent() {
        // Content is configured in setupProductInfo()
    }

    private func presentAuthViewController() {
        let authVC = AuthViewController()
        authVC.onUserAuthenticated = { [weak self] user in
            self?.dismiss(animated: true)
        }
        let navController = UINavigationController(rootViewController: authVC)
        present(navController, animated: true)
    }

    private func purchaseProduct() {

        guard let user = AuthManager.shared.currentUser else {
            self.presentAuthViewController()
            return
        }

        // Handle the purchasing of your product here

        Task { @MainActor in
            do {
                let response = try await Dub.shared.trackSale(
                    customerExternalId: user.id,
                    amount: Int(round(product.price * 100)),
                    currency: "usd",
                    eventName: "Purchase"
                )

                print(response)
            } catch {
                print(error.localizedDescription)
            }
        }

        dismiss(animated: true)
    }

    @objc private func doneTapped() {
        dismiss(animated: true)
    }

    @objc private func purchaseButtonTapped() {
        purchaseProduct()
    }
}

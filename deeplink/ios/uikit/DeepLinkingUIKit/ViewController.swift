//
//  ViewController.swift
//  DeepLinkingUIKit
//
//  Created by Ian MacCallum on 9/19/25.
//

import UIKit

class ViewController: UIViewController {
    
    // UI Elements
    private let titleLabel = UILabel()
    private let deepLinkLabel = UILabel()
    private let pasteButton = UIButton(type: .system)
    private let mainStackView = UIStackView()
    
    // Properties
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupConstraints()
        
        // Set up notification for when app becomes active (equivalent to onOpenURL)
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleDeepLinkNotification(_:)),
            name: .deepLinkReceived,
            object: nil
        )
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    private func setupUI() {
        view.backgroundColor = .systemBackground
        
        // Title Label
        titleLabel.text = "Dub deep linking demo"
        titleLabel.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        titleLabel.textAlignment = .center
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        
        // Deep Link Label
        deepLinkLabel.text = "Deep link: -"
        deepLinkLabel.font = UIFont.systemFont(ofSize: 16)
        deepLinkLabel.textAlignment = .center
        deepLinkLabel.numberOfLines = 0
        deepLinkLabel.translatesAutoresizingMaskIntoConstraints = false
        
        // Paste Button
        pasteButton.setTitle("Paste Link", for: .normal)
        pasteButton.titleLabel?.font = UIFont.systemFont(ofSize: 16)
        pasteButton.backgroundColor = .systemBlue
        pasteButton.setTitleColor(.white, for: .normal)
        pasteButton.layer.cornerRadius = 8
        pasteButton.translatesAutoresizingMaskIntoConstraints = false
        pasteButton.addTarget(self, action: #selector(pasteButtonTapped), for: .touchUpInside)
        
        // Main Stack View
        mainStackView.axis = .vertical
        mainStackView.alignment = .center
        mainStackView.spacing = 16
        mainStackView.translatesAutoresizingMaskIntoConstraints = false
        
        // Add arranged subviews to stack view
        mainStackView.addArrangedSubview(titleLabel)
        mainStackView.addArrangedSubview(deepLinkLabel)
        mainStackView.addArrangedSubview(pasteButton)
        
        // Add stack view to main view
        view.addSubview(mainStackView)
    }
    
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            // Main Stack View
            mainStackView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            mainStackView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            mainStackView.leadingAnchor.constraint(greaterThanOrEqualTo: view.leadingAnchor, constant: 20),
            mainStackView.trailingAnchor.constraint(lessThanOrEqualTo: view.trailingAnchor, constant: -20),
            
            // Deep Link Label width constraint (for proper text wrapping)
            deepLinkLabel.leadingAnchor.constraint(equalTo: mainStackView.leadingAnchor),
            deepLinkLabel.trailingAnchor.constraint(equalTo: mainStackView.trailingAnchor),
            
            // Paste Button size
            pasteButton.widthAnchor.constraint(equalToConstant: 120),
            pasteButton.heightAnchor.constraint(equalToConstant: 44)
        ])
    }
    
    @objc private func pasteButtonTapped() {
        guard UIPasteboard.general.hasStrings else { return }
        
        let pasteboardStrings = UIPasteboard.general.strings ?? []
        
        guard !pasteboardStrings.isEmpty, let url = URL(string: pasteboardStrings[0]) else {
            return
        }
        
        print("Pasted url: \(url.absoluteString)")
        
        // HACK: - Just for testing, send back the pasted url to the app delegate for handling with Dub
        (UIApplication.shared.delegate as? AppDelegate)?.trackOpen(deepLink: url)
    }
    
    @objc private func handleDeepLinkNotification(_ notification: Notification) {
        print("Recieved deep link notification")
        
        guard let userInfo = notification.userInfo,
              let url = userInfo["url"] as? String else {
            return
        }
        
        handleDeepLink(url: url)
    }
    
    private func handleDeepLink(url: String) {
        updateDeepLinkLabel(for: url)
        presentDetailViewController(with: url)
    }
    
    private func updateDeepLinkLabel(for url: String?) {
        deepLinkLabel.text = "Deep link: \(url ?? "-")"
    }
    
    private func presentDetailViewController(with url: String) {
        let detailVC = DetailViewController(url: url)
        let navController = UINavigationController(rootViewController: detailVC)
        present(navController, animated: true)
    }
}

class DetailViewController: UIViewController {
    
    private let url: String
    private let urlLabel = UILabel()
    
    init(url: String) {
        self.url = url
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupConstraints()
    }
    
    private func setupUI() {
        view.backgroundColor = .systemBackground
        title = "Detail"
        
        // Add close button
        navigationItem.leftBarButtonItem = UIBarButtonItem(
            barButtonSystemItem: .close,
            target: self,
            action: #selector(closeButtonTapped)
        )
        
        // URL Label
        urlLabel.text = "Navigated to: \(url)"
        urlLabel.font = UIFont.systemFont(ofSize: 16)
        urlLabel.textAlignment = .center
        urlLabel.numberOfLines = 0
        urlLabel.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(urlLabel)
    }
    
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            urlLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            urlLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            urlLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            urlLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20)
        ])
    }
    
    @objc private func closeButtonTapped() {
        dismiss(animated: true)
    }
}

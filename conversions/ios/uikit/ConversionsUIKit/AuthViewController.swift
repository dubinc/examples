//
//  AuthViewController.swift
//  DubUIKitDemo
//
//  Created by Ian MacCallum on 9/18/25.
//

import UIKit
import Dub

// MARK: - Auth View Controller
class AuthViewController: UIViewController {

    private let scrollView = UIScrollView()
    private let contentView = UIView()
    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()
    private let usernameTextField = UITextField()
    private let passwordTextField = UITextField()
    private let loginButton = UIButton(type: .system)
    private let errorLabel = UILabel()
    private let activityIndicator = UIActivityIndicatorView(style: .medium)

    var onUserAuthenticated: ((User) -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }

    private func setupUI() {
        title = "Sign In"
        view.backgroundColor = .systemBackground

        navigationItem.leftBarButtonItem = UIBarButtonItem(
            barButtonSystemItem: .cancel,
            target: self,
            action: #selector(cancelTapped)
        )

        setupScrollView()
        setupContent()
    }

    private func setupScrollView() {
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        contentView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(scrollView)
        scrollView.addSubview(contentView)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor)
        ])
    }

    private func setupContent() {
        // Title
        titleLabel.text = "Welcome Back"
        titleLabel.font = .systemFont(ofSize: 28, weight: .bold)
        titleLabel.textAlignment = .center
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        // Subtitle
        subtitleLabel.text = "Sign in to your account"
        subtitleLabel.font = .systemFont(ofSize: 16, weight: .regular)
        subtitleLabel.textColor = .secondaryLabel
        subtitleLabel.textAlignment = .center
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false

        // Username TextField
        usernameTextField.text = "emilys"
        usernameTextField.placeholder = "Enter username"
        usernameTextField.borderStyle = .roundedRect
        usernameTextField.font = .systemFont(ofSize: 16)
        usernameTextField.translatesAutoresizingMaskIntoConstraints = false

        // Password TextField
        passwordTextField.text = "emilyspass"
        passwordTextField.placeholder = "Enter password"
        passwordTextField.borderStyle = .roundedRect
        passwordTextField.font = .systemFont(ofSize: 16)
        passwordTextField.isSecureTextEntry = true
        passwordTextField.translatesAutoresizingMaskIntoConstraints = false

        // Login Button
        loginButton.setTitle("Sign In", for: .normal)
        loginButton.titleLabel?.font = .systemFont(ofSize: 16, weight: .semibold)
        loginButton.setTitleColor(.white, for: .normal)
        loginButton.backgroundColor = .systemBlue
        loginButton.layer.cornerRadius = 12
        loginButton.addTarget(self, action: #selector(loginTapped), for: .touchUpInside)
        loginButton.translatesAutoresizingMaskIntoConstraints = false

        // Error Label
        errorLabel.font = .systemFont(ofSize: 14, weight: .medium)
        errorLabel.textColor = .systemRed
        errorLabel.textAlignment = .center
        errorLabel.numberOfLines = 0
        errorLabel.isHidden = true
        errorLabel.translatesAutoresizingMaskIntoConstraints = false

        // Activity Indicator
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        activityIndicator.hidesWhenStopped = true

        // Add to content view
        [titleLabel, subtitleLabel, usernameTextField, passwordTextField,
         errorLabel, loginButton, activityIndicator].forEach {
            contentView.addSubview($0)
        }

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 40),
            titleLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            subtitleLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            subtitleLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),

            usernameTextField.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 40),
            usernameTextField.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            usernameTextField.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),
            usernameTextField.heightAnchor.constraint(equalToConstant: 50),

            passwordTextField.topAnchor.constraint(equalTo: usernameTextField.bottomAnchor, constant: 16),
            passwordTextField.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            passwordTextField.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),
            passwordTextField.heightAnchor.constraint(equalToConstant: 50),

            errorLabel.topAnchor.constraint(equalTo: passwordTextField.bottomAnchor, constant: 16),
            errorLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            errorLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),

            loginButton.topAnchor.constraint(equalTo: errorLabel.bottomAnchor, constant: 24),
            loginButton.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            loginButton.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),
            loginButton.heightAnchor.constraint(equalToConstant: 50),
            loginButton.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -24),

            activityIndicator.centerXAnchor.constraint(equalTo: loginButton.centerXAnchor),
            activityIndicator.centerYAnchor.constraint(equalTo: loginButton.centerYAnchor)
        ])
    }

    @objc private func cancelTapped() {
        dismiss(animated: true)
    }

    @objc private func loginTapped() {
        guard let username = usernameTextField.text, !username.isEmpty,
              let password = passwordTextField.text, !password.isEmpty else {
            return
        }

        errorLabel.isHidden = true
        activityIndicator.startAnimating()
        loginButton.setTitle("", for: .normal)
        loginButton.isEnabled = false

        Task { @MainActor in
            do {
                let user = try await APIService.shared.login(username: username, password: password)

                AuthManager.shared.login(user: user)
                onUserAuthenticated?(user)

                // Track the lead event in Dub
                let response = try await Dub.shared.trackLead(
                    eventName: "User Sign Up",
                    customerExternalId: user.id,
                    customerName: "\(user.firstName) \(user.lastName)",
                    customerEmail: user.email
                )

                print(response)

                dismiss(animated: true)
            } catch {
                print("Login failed: \(error.localizedDescription)")
                errorLabel.text = "Login failed. Please check your credentials."
                errorLabel.isHidden = false
            }

            activityIndicator.stopAnimating()
            loginButton.setTitle("Sign In", for: .normal)
            loginButton.isEnabled = true
        }
    }
}


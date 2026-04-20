//
//  AuthView.swift
//  Dub
//
//  Created by Ian MacCallum on 9/15/25.
//

import SwiftUI

// MARK: - Auth View
struct AuthView: View {
    @Environment(\.dismiss) private var dismiss

    private let api = APIService()
    
    @State private var username = "emilys"
    @State private var password = "emilyspass"
    @State private var isLoading = false
    @State private var errorMessage = ""

    let onUserAuthenticated: (User) -> Void

    init(onUserAuthenticated: @escaping (User) -> Void) {
        self.onUserAuthenticated = onUserAuthenticated
    }

    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Text("Welcome Back")
                        .font(.system(size: 28, weight: .bold))
                    Text("Sign in to your account")
                        .font(.system(size: 16, weight: .regular))
                        .foregroundColor(.secondary)
                }
                .padding(.top, 40)

                VStack(spacing: 16) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Username")
                            .font(.system(size: 14, weight: .semibold))
                        TextField("Enter username", text: $username)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .font(.system(size: 16))
                    }

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Password")
                            .font(.system(size: 14, weight: .semibold))
                        SecureField("Enter password", text: $password)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .font(.system(size: 16))
                    }
                }

                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.red)
                        .multilineTextAlignment(.center)
                }

                Button(action: handleLogin) {
                    HStack {
                        if isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .scaleEffect(0.8)
                        }
                        Text(isLoading ? "Signing In..." : "Sign In")
                            .font(.system(size: 16, weight: .semibold))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(.blue)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                }
                .disabled(isLoading || username.isEmpty || password.isEmpty)
                .opacity((username.isEmpty || password.isEmpty) ? 0.6 : 1.0)

                Spacer()
            }
            .padding()
            .navigationTitle("Sign In")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }

    private func handleLogin() {
        isLoading = true
        errorMessage = ""

        Task { @MainActor in
            do {
                let response = try await api.login(username: username, password: password)

                onUserAuthenticated(response)
                dismiss()
            } catch {
                print(error)
                errorMessage = "Login failed. Please check your credentials."
                isLoading = false
            }
        }
    }
}


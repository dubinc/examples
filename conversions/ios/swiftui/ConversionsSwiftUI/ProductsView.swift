//
//  ProductsView.swift
//  DubSwiftUIDemo
//
//  Created by Ian MacCallum on 9/18/25.
//

import SwiftUI

// MARK: - Products View
struct ProductsView: View {
    private let api = APIService()
    @EnvironmentObject var authManager: AuthManager
    @State private var products: [Product] = []
    @State private var isLoading = true
    @State private var showingAuth = false
    @State private var selectedProduct: Product?

    let onUserAuthenticated: (User) -> Void
    let onProductSelected: (Product) -> Void

    init(
        onUserAuthenticated: @escaping (User) -> Void,
        onProductSelected: @escaping (Product) -> Void
    ) {
        self.onUserAuthenticated = onUserAuthenticated
        self.onProductSelected = onProductSelected
    }

    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {
            ZStack {
                if isLoading {
                    VStack(spacing: 20) {
                        ProgressView()
                            .scaleEffect(1.5)
                        Text("Loading Products...")
                            .font(.title3)
                            .fontWeight(.medium)
                            .foregroundColor(.secondary)
                    }
                } else {
                    ScrollView {
                        LazyVGrid(columns: columns) {
                            ForEach(products) { product in
                                ProductCardView(product: product) {
                                    onProductSelected(product)
                                }
                            }
                        }
                        .padding(8)
                    }
                }
            }
            .navigationTitle("Products")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        if authManager.isAuthenticated {
                            authManager.logout()
                        } else {
                            showingAuth = true
                        }
                    }) {
                        if authManager.isAuthenticated, let user = authManager.currentUser {
                            AsyncImage(url: URL(string: user.image)) { image in
                                image
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                            } placeholder: {
                                Circle()
                                    .fill(Color.gray.opacity(0.3))
                            }
                            .frame(width: 32, height: 32)
                            .clipShape(Circle())
                        } else {
                            Text("Login")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(.white)
                                .padding(.horizontal, 16)
                                .padding(.vertical, 8)
                                .background(.blue)
                                .cornerRadius(20)
                        }
                    }
                }
            }
        .sheet(isPresented: $showingAuth) {
            AuthView(onUserAuthenticated: onUserAuthenticated)
        }
        .onAppear {
            loadProducts()
        }
    }

    private func loadProducts() {
        Task {
            do {
                products = try await self.api.fetchProducts()
                isLoading = false
            } catch {
                print("Error loading products: \(error)")
                isLoading = false
            }
        }
    }
}

// MARK: - Product Card View
struct ProductCardView: View {
    let product: Product
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 12) {
                AsyncImage(url: URL(string: product.thumbnail)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                        .overlay {
                            ProgressView()
                        }
                }
                .frame(height: 160)
                .cornerRadius(12)
                .clipped()

                VStack(alignment: .leading, spacing: 4) {
                    Text(product.title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.primary)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)

                    Text("$\(product.price, specifier: "%.2f")")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(Color(.darkText))
                }
                .padding(.horizontal, 8)
                .padding(.bottom, 8)
            }
        }
        .buttonStyle(PlainButtonStyle())
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 2)
    }
}


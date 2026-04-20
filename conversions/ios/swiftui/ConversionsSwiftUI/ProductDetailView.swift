//
//  ProductDetailView.swift
//  DubSwiftUIDemo
//
//  Created by Ian MacCallum on 9/18/25.
//

import SwiftUI

// MARK: - Product Detail View
struct ProductDetailView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var authManager: AuthManager

    @State private var selectedImageIndex = 0
    @State private var showingAuth = false

    let product: Product
    let onProductPurchased: (Product, User) -> Void

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Image Gallery
                    TabView(selection: $selectedImageIndex) {
                        ForEach(0..<product.images.count, id: \.self) { index in
                            AsyncImage(url: URL(string: product.images[index])) { image in
                                image
                                    .resizable()
                                    .aspectRatio(contentMode: .fit)
                            } placeholder: {
                                Rectangle()
                                    .fill(Color.gray.opacity(0.2))
                                    .overlay {
                                        ProgressView()
                                    }
                            }
                            .tag(index)
                        }
                    }
                    .frame(height: 300)
                    .tabViewStyle(PageTabViewStyle(indexDisplayMode: .automatic))
                    .cornerRadius(16)

                    VStack(alignment: .leading, spacing: 16) {
                        // Title and Rating
                        VStack(alignment: .leading, spacing: 8) {
                            Text(product.title)
                                .font(.system(size: 24, weight: .bold))

                            HStack {
                                HStack(spacing: 4) {
                                    ForEach(0..<5) { star in
                                        Image(systemName: star < Int(product.rating) ? "star.fill" : "star")
                                            .foregroundColor(.yellow)
                                            .font(.system(size: 14))
                                    }
                                    Text("(\(product.rating, specifier: "%.1f"))")
                                        .font(.system(size: 14, weight: .medium))
                                        .foregroundColor(.secondary)
                                }

                                Spacer()

                                Text("\(product.stock) in stock")
                                    .font(.system(size: 14, weight: .medium))
                                    .foregroundColor(product.stock > 10 ? .green : .orange)
                            }
                        }

                        // Price
                        HStack(alignment: .center) {
                            Text("$\(product.price, specifier: "%.2f")")
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(Color(.darkText))

                            if product.discountPercentage > 0 {
                                VStack(alignment: .leading) {
                                    Text("\(Int(product.discountPercentage))% OFF")
                                        .font(.system(size: 12, weight: .bold))
                                        .foregroundColor(.white)
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 4)
                                        .background(Color.red)
                                        .cornerRadius(6)
                                }
                            }

                            Spacer()
                        }

                        // Brand and Category
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Brand")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.secondary)
                                Text(product.brand ?? "-")
                                    .font(.system(size: 16, weight: .semibold))
                            }

                            Spacer()

                            VStack(alignment: .trailing, spacing: 4) {
                                Text("Category")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.secondary)
                                Text(product.category.capitalized)
                                    .font(.system(size: 16, weight: .semibold))
                            }
                        }
                        .padding()
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(12)

                        // Description
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Description")
                                .font(.system(size: 18, weight: .semibold))
                            Text(product.description)
                                .font(.system(size: 16, weight: .regular))
                                .lineSpacing(2)
                        }

                        // Purchase Button
                        Button(action: {
                            if let currentUser = authManager.currentUser {
                                onProductPurchased(product, currentUser)
                                dismiss()
                            } else {
                                showingAuth = true
                            }
                        }) {
                            Text("Purchase product")
                                .font(.system(size: 18, weight: .semibold))
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 16)
                                .background(.blue)
                                .foregroundColor(.white)
                                .cornerRadius(16)
                        }
                        .padding(.top, 8)
                    }
                    .padding()
                }
            }
            .navigationTitle("Product Details")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
            .sheet(isPresented: $showingAuth) {
                AuthView { user in
                    authManager.login(user: user)
                }
            }
        }
    }
}

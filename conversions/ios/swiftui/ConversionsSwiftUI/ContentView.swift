//
//  ContentView.swift
//  Dub
//
//  Created by Ian MacCallum on 9/15/25.
//

import SwiftUI
import Dub

struct ContentView: View {
    @Environment(\.dub) var dub: Dub

    private let api = APIService()

    @StateObject private var authManager = AuthManager()
    @State private var selectedProduct: Product?

    // Uncomment the following line and comment out `isFirstLaunch` below to test pasting the currently copied link
    // @State var isFirstLaunch = true

   @AppStorage("is_first_launch") private var isFirstLaunch = true

    var body: some View {
        NavigationView {
            ProductsView(
                onUserAuthenticated: { user in
                    onUserAuthenticated(user)
                },
                onProductSelected: { product in
                    selectedProduct = product
                }
            )
            .onOpenURL { url in
                trackOpen(deepLink: url)
            }
            .onAppear {
                if isFirstLaunch {
                    trackOpen()
                    isFirstLaunch = false
                }
            }
            .sheet(item: $selectedProduct) { product in
                ProductDetailView(
                    product: product,
                    onProductPurchased: onProductPurchased
                )
            }
        }
        .environmentObject(authManager)
    }

    private func onProductPurchased(_ product: Product, user: User) {
        authManager.login(user: user)
        trackSale(product: product, user: user)
    }

    private func onUserAuthenticated(_ user: User) {
        authManager.login(user: user)
        trackLead(for: user)
    }

    // Step 1: Track the open
    // Call `dub.trackOpen` from onAppear only on the first launch and `onOpenURL`
    private func trackOpen(deepLink: URL? = nil) {
        print("Tracking open: \(deepLink?.absoluteString ?? "-")")
        Task {
            do {
                let response = try await dub.trackOpen(deepLink: deepLink)

                // Navigate to final link via link.url
                guard let url = response.link?.url else {
                    return
                }

                // Parse the deep link from the url
                guard let deepLink = DeepLink(from: url) else {
                    return
                }

                switch deepLink {
                case .product(let id):
                    // Fetch the product from the API
                    let product = try await api.fetchProduct(id)
                    selectedProduct = product
                }

            } catch let error as DubError {
                print(error.localizedDescription)
            }
        }
    }

    // Step 1: Track a lead event
    // Learn more about lead tracking [here](https://dub.co/docs/conversions/leads/client-side)
    private func trackLead(for user: User) {
        Task {
            do {
                let response = try await dub.trackLead(
                    eventName: "User Sign Up",
                    customerExternalId: user.id,
                    customerName: "\(user.firstName) \(user.lastName)",
                    customerEmail: user.email
                )

                print(response)
            } catch let error as DubError {
                print(error.localizedDescription)
            }
        }
    }

    // Step 3: Track a sale event whenever a user completes a purchase in your app.
    // Learn more about sale tracking [here](https://dub.co/docs/conversions/sales/client-side)
    private func trackSale(product: Product, user: User) {
        Task {
            do {
                let response = try await dub.trackSale(
                    customerExternalId: user.id,
                    amount: Int(round(product.price * 100)),
                    currency: "usd",
                    eventName: "Purchase"
                )

                print(response)
            } catch let error as DubError {
                print(error.localizedDescription)
            }
        }
    }
}

struct DetailView: View {
    let url: String

    var body: some View {
        Text("Navigated to: \(url)")
    }
}

#Preview {
    ContentView()
        .environment(\.dub, Dub.shared)
}

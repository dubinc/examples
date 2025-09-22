//
//  AppDelegate.swift
//  DubUIKitDemo
//
//  Created by Ian MacCallum on 9/17/25.
//

import UIKit
import Dub

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    private let dubPublishableKey = "<DUB_PUBLISHABLE_KEY>"
    private let dubDomain = "<DUB_DOMAIN>"

    // Uncomment the following line and comment out `isFirstLaunch` below to test pasting the currently copied link
    // private var isFirstLaunch: Bool = true

    private var isFirstLaunch: Bool {
        get {
            UserDefaults.standard.object(forKey: "is_first_launch") as? Bool ?? true
        }
        set {
            UserDefaults.standard.set(newValue, forKey: "is_first_launch")
        }
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Dub.setup(publishableKey: dubPublishableKey, domain: dubDomain)

        // Track first launch
        if isFirstLaunch {
            trackOpen()
            isFirstLaunch = false
        }

        // Override point for customization after application launch.
        return true
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        handleDeepLink(url: url)
        return true
    }

    func handleDeepLink(url: URL) {
        trackOpen(deepLink: url)
    }

    private func trackOpen(deepLink: URL? = nil) {
        // Call the tracking endpoint with the full deep link URL
        Task {
            do {
                let response = try await Dub.shared.trackOpen(deepLink: deepLink)

                print(response)

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
                    let product = try await APIService.shared.fetchProduct(id)

                    // Present the view controller for the product
                    // Get the scene delegate and present the product detail view controller
                    guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                          let sceneDelegate = windowScene.delegate as? SceneDelegate,
                          let window = sceneDelegate.window,
                          let navigationController = window.rootViewController as? UINavigationController else {
                        return
                    }

                    let detailVC = ProductDetailViewController(product: product)
                    let navController = UINavigationController(rootViewController: detailVC)

                    navigationController.present(navController, animated: true)
                }
            } catch let error as DubError {
                print(error.localizedDescription)
            }
        }
    }

    // MARK: UISceneSession Lifecycle
    
    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
}

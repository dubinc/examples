//
//  ContentView.swift
//  DeepLinkingSwiftUI
//
//  Created by Ian MacCallum on 9/19/25.
//

import SwiftUI
import Dub

struct DeepLink: Identifiable {
    let url: String

    var id: String {
        url
    }
}

struct ContentView: View {
    @Environment(\.dub) var dub: Dub

    // Uncomment the following line and comment out `isFirstLaunch` below to test pasting the currently copied link
//        @State var isFirstLaunch = true

    @AppStorage("is_first_launch") private var isFirstLaunch = true

    @State private var deepLink: DeepLink?

    var body: some View {
        NavigationView {
            VStack(alignment: .center, spacing: 16) {
                Text("Dub deep linking demo")

                Text("Deep link: \(deepLink?.url ?? "-")")

                PasteButton(payloadType: String.self) { strings in
                    if strings.isEmpty {
                        return
                    }

                    guard let url = URL(string: strings[0]) else {
                        return
                    }
                    
                    trackOpen(deepLink: url)
                }
            }
            .onOpenURL { url in
                trackOpen(deepLink: url)
            }
            .onAppear {
                if isFirstLaunch {
                    trackOpen()
                    isFirstLaunch = false
                }
            }
            .sheet(item: $deepLink) { deepLink in
                return DetailView(url: deepLink.url)
            }
        }
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

                self.deepLink = DeepLink(url: url)
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

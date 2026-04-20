//
//  DubApp.swift
//  Dub
//
//  Created by Ian MacCallum on 9/15/25.
//

import SwiftUI
import Dub

@main
struct DubApp: App {
    private let dubPublishableKey = "<DUB_PUBLISHABLE_KEY>"
    private let dubDomain = "<DUB_DOMAIN>"

    init() {
        Dub.setup(publishableKey: dubPublishableKey, domain: dubDomain)
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.dub, Dub.shared)
        }
    }
}

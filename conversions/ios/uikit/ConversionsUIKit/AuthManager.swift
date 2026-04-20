//
//  AuthManager.swift
//  DubSwiftUIDemo
//
//  Created by Ian MacCallum on 9/18/25.
//

import SwiftUI

// MARK: - Auth Manager
class AuthManager {
    static let shared = AuthManager()

    private(set) var isAuthenticated = false
    private(set) var currentUser: User?

    private init() {}

    func login(user: User) {
        currentUser = user
        isAuthenticated = true
        NotificationCenter.default.post(name: .userDidLogin, object: user)
    }

    func logout() {
        currentUser = nil
        isAuthenticated = false
        NotificationCenter.default.post(name: .userDidLogout, object: nil)
    }
}

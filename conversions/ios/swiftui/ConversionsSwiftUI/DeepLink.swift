//
//  DeepLink.swift
//  DubSwiftUIDemo
//
//  Created by Ian MacCallum on 9/18/25.
//

import Foundation

enum DeepLink {
    case product(id: String)

    init?(from urlString: String) {
        guard let url = URL(string: urlString) else {
            return nil
        }

        let pathComponents = url.pathComponents
        let productId: String?

        if let productIndex = pathComponents.firstIndex(of: "product"),
           productIndex + 1 < pathComponents.count {
            productId = pathComponents[productIndex + 1]
        } else {
            productId = pathComponents.last
        }

        guard let productId = productId, !productId.isEmpty else {
            return nil
        }

        self = .product(id: productId)
    }
}


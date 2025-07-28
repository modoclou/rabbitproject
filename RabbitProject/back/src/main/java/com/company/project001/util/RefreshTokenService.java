package com.company.project001.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class RefreshTokenService {
    private final Map<String, String> store = new HashMap<>();

    public void save(String username, String token) {
        store.put(username, token);
    }

    public boolean isValid(String username, String token) {
        return token.equals(store.get(username));
    }

    public void invalidate(String username) {
        store.remove(username);
    }
}

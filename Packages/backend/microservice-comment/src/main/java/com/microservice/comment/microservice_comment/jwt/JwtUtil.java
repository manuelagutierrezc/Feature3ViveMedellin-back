package com.microservice.comment.microservice_comment.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        Claims payload = Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claimsResolver.apply(payload);
    }

    public Integer getUserIdFromToken(String token) {
        return getClaim(token, claims -> {
            Object raw = claims.get("userId");
            if (raw instanceof Integer) return (Integer) raw;
            if (raw instanceof String) return Integer.parseInt((String) raw);
            return null;
        });
    }

}

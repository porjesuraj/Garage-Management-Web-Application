package com.app.filters;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.utils.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		
		String authToken = req.getHeader("token");
			
		String email = null;
		String role = null;
		String password = null; 
		
		if (authToken != null) {
			try {
			
				
				
				email = jwtTokenUtil.getEmailFromToken(authToken);
				role = jwtTokenUtil.getRoleFromToken(authToken);
				password = jwtTokenUtil.getPasswordFromToken(authToken); 
				
				System.out.println("Extracted email " + email);
				System.out.println("Extracted password : " + password );
				System.out.println("Extracted Role : "+role);
			
				
				req.setAttribute("email", email);
				req.setAttribute("password", password);
				
				
				
			} catch (Exception e) {
				System.out.println("Invalid Token");
			}
		} else {
			System.out.println("Token Not Found");
		}
		
		if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			System.out.println("Using Token");
			UserDetails userDetails = userDetailsService.loadUserByUsername(email);

			if (jwtTokenUtil.validateToken(authToken, userDetails)) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, Arrays.asList(new SimpleGrantedAuthority("ROLE_"+role)));
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
				logger.info("authenticated user " + email + ", setting security context");
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}

		chain.doFilter(req, res);
	}
}
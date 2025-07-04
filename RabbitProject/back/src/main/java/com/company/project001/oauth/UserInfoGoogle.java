package com.company.project001.oauth;

import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserInfoGoogle implements UserInfoOAuth2 {

	private final Map<String, Object > attributes;
	
	@Override
	public String getProvier() {
		return "goole";
	}

	@Override
	public String getProvierId() {
		Object value = attributes.get("sub");
		return value != null ? value.toString() : null ;
	}

	@Override
	public String getEmail() {
		return (String)attributes.get("email");
	}

	@Override
	public String getNickname() {
		return (String)attributes.get("name");
	}

	@Override
	public String getImage() {
		Object pic = attributes.get("picture");
		return pic != null ? pic.toString() : "/images/thejoa.png";
	}

}

// https://console.cloud.google.com/
/*
<google>
{
   sub=103058387739722400130, 
   name=안효정, 
   given_name=효정, 
   family_name=안, 
   picture=https://lh3.googleusercontent.com/a/AEdFTp5SiCyTaOLog9sDPN6QhWwsUj7xPbfj4HQF0fdC=s96-c, 
   email=sally03915@gmail.com, 
   email_verified=true, 
   locale=ko
}

*/
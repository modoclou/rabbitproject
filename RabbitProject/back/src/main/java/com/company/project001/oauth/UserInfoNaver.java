package com.company.project001.oauth;

import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserInfoNaver implements UserInfoOAuth2 {

	private final Map<String, Object > attributes;
	
	@SuppressWarnings("uncheked")
	private Map<String, Object> getResponse(){
		Object response = attributes.get("response");
		return response instanceof Map ? (Map<String, Object>) response : null;
	}
	
	@Override
	public String getProvier() {
		return "naver";
	}

	@Override
	public String getProvierId() {
		Map<String, Object> response = getResponse();
		return response != null ? String.valueOf( response.get("id")) : null;
	}

	@Override
	public String getEmail() {
		Map<String, Object> response = getResponse();
		return response != null ? String.valueOf(response.get("email")) : null;
	}

	@Override
	public String getNickname() {
		Map<String, Object> response = getResponse();
		return response != null ?String.valueOf(response.get("name")) : null;
	}

    @Override
    public String getImage() {
        Map<String, Object> response = getResponse();
        String image = response != null ? (String) response.get("profile_image") : null;
        return image != null ? image : "/images/thejoa.png";
    }

}
/*
<naver>
{
    resultcode=00, 
    message=success, 
    response = {
        id=pvdq1FSG3VZlD7Cp3JuWfAFi-3xir6A-WPlP5f8kXIo, email=sally03915@naver.com, 
        name=안효정
    }
}
 */

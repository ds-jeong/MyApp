package com.demo.MyApp.common.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


@Service
public class OAuthService {

    public String getKaKaoAccessToken(String code) {

        String access_token = "";
        String refresh_token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
//            sb.append("&client_id=" + clientId);
//            sb.append("&redirect_uri=" + redirectUri);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_token);
            System.out.println("refresh_token : " + refresh_token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_token;
    }

    public HashMap<String, Object> getUserKakaoInfo(String access_token) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + access_token);

            int responseCode = conn.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String id = element.getAsJsonObject().get("id").getAsString();

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.get("nickname").getAsString();
            if(kakao_account.getAsJsonObject().get("email") != null) {
                String email = kakao_account.getAsJsonObject().get("email").getAsString();
                userInfo.put("email", email);
            }

            userInfo.put("nickname", nickname);
            userInfo.put("id", id);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return userInfo;
    }

//    public UserKakaoLoginResponseDto kakaoLogin(String access_token) {
//        UserKakaoSignupRequestDto userKakaoSignupRequestDto
//                = getUserKaKaoSignupRequestDto(getUserKakaoInfo(access_token));
//
//        UserResponseDto userResponseDto = findByUserKakaoIdentifier(userKakaoSignupRequestDto.getUserKakaoIdentifier());
//
//        if(userResponseDto == null) {
//            signUp(userKakaoSignupRequestDto);
//            userResponseDto = find
//        }
//    }


}

package com.demo.MyApp.common.service;

import com.demo.MyApp.config.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.security.core.Authentication;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


@Service
public class KakaoLoginService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Value("${client.id}")
    private String clientId;

    @Value("${client.redirect-uri}")
    private String redirectUri;

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
            sb.append("&client_id=" + clientId);
            sb.append("&redirect_uri=" + redirectUri);
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
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            System.out.println("kakao_account  : " + kakao_account);

            //연동로그인시 마이페이지에 아이디,이름,전화번호,이메일 자동채워짐
            String email = kakao_account.get("email").getAsString();
            String name = kakao_account.get("name").getAsString();
            String phone_number = kakao_account.get("phone_number").getAsString();

            if(email != null) {
                userInfo.put("id", id);
//                userInfo.put("properties", properties);
                userInfo.put("email", email);
                userInfo.put("name", name);
                userInfo.put("phone_number", phone_number);
            }

            System.out.println("account_userinfo : " + id + "   " + email + "   " + name + "  " + phone_number);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return userInfo;
    }


    public String kakaoLogin(String id) {
        // 권한 목록을 가져와서 SimpleGrantedAuthority로 변환
        List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));

        // UsernamePasswordAuthenticationToken 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(id, "-1", authorities);
        String jwtToken = jwtTokenProvider.createToken(authentication);

        return jwtToken;
    }


}

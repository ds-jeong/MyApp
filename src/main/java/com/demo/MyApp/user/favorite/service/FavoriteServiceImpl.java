package com.demo.MyApp.user.favorite.service;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.repository.ProductRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.favorite.entity.Favorite;
import com.demo.MyApp.user.favorite.repository.FavoriteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Transactional
    public void toggleLike(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        Optional<Favorite> existingLike = favoriteRepository.findByUserAndProduct(user, product);

        if (existingLike.isPresent()) {
            // If like exists, remove it
            favoriteRepository.deleteByUserAndProduct(user, product);
        } else {
            // If like does not exist, add it
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
            //like_cnt 지워도될지 논의
        }
    }

    @Override
    public List<Long> likedProducts(Long userId) {
        List<Favorite> favoriteList = favoriteRepository.findByUserId(userId);
        List<Long> productIdList = new ArrayList<>();
        //favorite 객체 -> product -> productId 추출
        for(Favorite favorite : favoriteList) {
            productIdList.add(favorite.getProduct().getProductId());
        }

        return productIdList;
    }
}

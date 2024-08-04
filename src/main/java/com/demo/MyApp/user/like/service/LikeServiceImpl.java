package com.demo.MyApp.user.like.service;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.repository.ProductRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.like.entity.Like;
import com.demo.MyApp.user.like.repository.LikeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class LikeServiceImpl implements LikeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Transactional
    public void toggleLike(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        Optional<Like> existingLike = likeRepository.findByUserAndProduct(user, product);

        if (existingLike.isPresent()) {
            // If like exists, remove it
            likeRepository.deleteByUserAndProduct(user, product);
        } else {
            // If like does not exist, add it
            Like like = new Like();
            like.setUser(user);
            like.setProduct(product);
            likeRepository.save(like);
        }
    }
}

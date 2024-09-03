package com.demo.MyApp.admin.product.controller;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/product")
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @PostMapping("/insertProduct")
    public String insertProduct(@ModelAttribute ProductDto productDto, @RequestParam("file") MultipartFile file) throws Exception{
        /* 관리자 > 상품등록 */
        productService.insertProduct(productDto, file);
        return "Post received successfully";
    }

    @GetMapping("/productList")
    public Page<Product> productList(Model model
            , @RequestParam("page") int page
            , @RequestParam("size") int size) throws Exception{
        /* 관리자 > 상품리스트 */
        return productService.productList(page, size);
    }

    @GetMapping("/productDetail")
    public ProductDto productDetail(@ModelAttribute ProductDto productDto, @RequestParam("id") Long id) throws Exception{
        /* 관리자 > 상품상세 */
        return productService.productDetail(id);
    }

    @GetMapping("/productModify")
    public ProductDto productModify(@ModelAttribute ProductDto productDto, @RequestParam("id") Long id) throws Exception{
        /* 관리자 > 상품수정 */
        return productService.productDetail(id);
    }

    @PostMapping("/updateProduct")
    public String updateProduct(@ModelAttribute ProductDto productDto,@RequestParam("id") Long id, @RequestParam("file") MultipartFile file, @RequestParam("originFilePath") String originFilePath) throws Exception{
        /* 관리자 > 상품변경 */
        productService.updateProduct(productDto, id, file, originFilePath);
        return "Post received successfully";
    }

    @GetMapping("/deleteProduct")
    public String deleteProduct(@ModelAttribute ProductDto productDto, @RequestParam("id") Long id) throws Exception{
        /* 관리자 > 상품삭제 */
        productService.deleteProduct(id);
        return "Post received successfully";
    }

}

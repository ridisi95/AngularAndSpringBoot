package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @CrossOrigin annotation helps to turnOff CORS blocking by spring boot
 * Can be used without args
 */
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // SELECT * FROM product WHERE category_id=?
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // SELECT * FROM product WHERE p.name LIKE CONCAT('%', :name, '%');
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
 
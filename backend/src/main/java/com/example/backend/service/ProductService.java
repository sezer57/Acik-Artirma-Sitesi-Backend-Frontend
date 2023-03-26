package com.example.backend.service;

import com.example.backend.dto.product_idprice;
import com.example.backend.dto.productdto;
import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;


    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    public Product newproduct(Product product){
        return productRepository.save(product);
    }

    public void saveproduct(){

        //başlangıçta 3 tane ürün oluşturuyor
        Product p1= new Product("Tarihi Para","https://upload.wikimedia.org/wikipedia/commons/d/d0/7antoninianii.jpg","Antoninianus, Roma İmparatorluğu'nda 2 denarius'a eşit gümüş bir sikke.",500,0,"2023");
        Product p2= new Product("Neoklasik vazo","https://upload.wikimedia.org/wikipedia/commons/9/91/Portland_Vase_V%26A.jpg"," 1790 dolaylarında jasper, yükseklik: 25,4 cm, genişlik: 18,7 cm",500,0,"2023");
        Product p3= new Product("Tablo","https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cole_Thomas_Lake_with_Dead_Trees_%28Catskill%29_1825.jpg/300px-Cole_Thomas_Lake_with_Dead_Trees_%28Catskill%29_1825.jpg","825'te Thomas Cole tarafından tamamlanan bir tuval üzerine yağlı boya tablodur.",500,0,"2023");
        productRepository.save(p1);
        productRepository.save(p2);
        productRepository.save(p3);

    }
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public List<product_idprice> getProductNewPrices() {
        List<Product> products = productRepository.findAll();
        List<product_idprice> productPrices = new ArrayList<>();
        for (Product product : products) {
            product_idprice productPrice = new product_idprice();
            productPrice.setId(product.getId());
            productPrice.setLastoffer(product.getLastoffer());
            productPrice.setTotaloffer(product.getTotaloffer());
            productPrice.setLastOfferUser(product.getLastOfferUser());
            productPrices.add(productPrice);
        }
        return productPrices;
    }

    public Product updateproducts(productdto productdto) {
        Optional<Product> optionalProduct = productRepository.findById(productdto.getId());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setLastoffer(productdto.getLastoffer());
            product.setLastOfferUser(productdto.getUsername());
            product.setTotaloffer(optionalProduct.get().getTotaloffer()+1);
            // update the product fields here
            productRepository.save(product);
            return product;
        }
        return null;
    }
}

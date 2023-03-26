package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "products_tables")
public class Product {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String name;
    private String img;
    private String info;
    private Integer lastoffer;
    private Integer totaloffer;
    private String Lasttime;
    private String lastOfferUser;

    public Product(){

    }
    public Product( String name,String img, String info, Integer lastoffer, Integer totaloffer, String lasttime) {

        this.name = name;
        this.info = info;
        this.img=img;
        this.lastoffer = lastoffer;
        this.totaloffer = totaloffer;
        this.Lasttime = lasttime;
        this.lastOfferUser = null;
    }
}

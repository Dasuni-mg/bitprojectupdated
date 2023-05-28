package com.gamagerestaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name= "porderstatus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Purchaseorderstatus {

    @Id
    //define Id as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //autogenerated value
    @Basic(optional = false)
    //Not Null
    @Column(name = "id")
    //map id attribute to the column name of the porderstatus table
    private Integer id;


    @Basic(optional = false)
    @Column(name = "name")
    private String name;
}

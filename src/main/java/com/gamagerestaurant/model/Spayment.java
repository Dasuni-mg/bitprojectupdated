package com.gamagerestaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="spayment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Spayment {

    @Id
    //define Id as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //autogenerated value
    @Basic(optional = false)
    //Not Null
    @Column(name = "id")
    //map id attribute to the column name of the supplier table
    private Integer id;


    @Column(name="billno")
    @Basic(optional = false)
    private String billno;


    @Column(name="grnamount")
    @Basic(optional = false)
    private BigDecimal grnamount;

    @Column(name="totalamount")
    @Basic(optional = false)
    private BigDecimal totalamount;

    @Column(name="paidamount")
    @Basic(optional = false)
    private BigDecimal paidamount;

    @Column(name="balanceamount")
    @Basic(optional = false)
    private BigDecimal  balanceamount;

    @Column(name="paiddate")
    @Basic(optional = false)
    private LocalDate paiddate;


    @Column(name="description")
    @Basic(optional = true)
    private String description;


    @Column(name="chequedate")
    @Basic(optional = false)
    private LocalDate chequedate;


    @Column(name="chequeno")
    @Basic(optional = false)
    private String chequeno;


    @Column(name="bankaccno")
    @Basic(optional = false)
    private String bankaccno;


    @Column(name="bankaccname")
    @Basic(optional = false)
    private String bankaccname;


    @Column(name="bankname")
    @Basic(optional = false)
    private String bankname;


    @Column(name="bankbranchname")
    @Basic(optional = false)
    private String bankbranchname;


    @Column(name="depositeddatetime")
    @Basic(optional = false)
    private LocalDateTime depositeddatetime;

    @Column(name="transferid")
    @Basic(optional = false)
    private String transferid;


    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JoinColumn(name="supplier_id",referencedColumnName ="id")
    private Supplier supplier_id;

    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JoinColumn(name="grn_id",referencedColumnName ="id")
    private Grn grn_id;

    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JoinColumn(name="paymentmethod_id",referencedColumnName ="id")
    private Paymentmethod paymentmethod_id;

    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JoinColumn(name="paymentstatus_id",referencedColumnName ="id")
    private Paymentstatus paymentstatus_id;

    public Spayment(String billno){
        this.billno = billno;
    }

    }



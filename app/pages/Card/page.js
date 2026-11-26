"use client";
import React, { useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import ScrollToTop from "@/app/component/ScrollToTop/ScrollToTop";

const Card = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Web Development Bootcamp",
      image: "/image/card.jpeg",
      price: 5000,
      discount: 50,
      quantity: 1,
    },
    {
      id: 2,
      title: "Advanced JavaScript Course",
      image: "/image/card.jpeg",
      price: 6000,
      discount: 60,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateItemTotal = (item) => {
    const discountedPrice = item.price - item.discount;
    return discountedPrice * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price - item.discount;
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.discount * item.quantity);
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalDiscount = calculateTotalDiscount();
  const originalTotal = calculateOriginalTotal();
  const deliveryCharge = subtotal > 0 ? 0 : 0;
  const grandTotal = subtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.cartContainer}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any courses to your cart yet.</p>
            <button className={styles.continueShoppingBtn}>Continue Shopping</button>
          </div>
        </div>
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className={styles.cartContent}>
          {/* Table Header */}
          <div className={styles.cartHeaderRow}>
            <div className={styles.colProduct}>Product</div>
            <div className={styles.colPrice}>Price</div>
            <div className={styles.colDiscount}>Discount</div>
            <div className={styles.colQuantity}>Quantity</div>
            <div className={styles.colTotal}>Total</div>
            <div className={styles.colAction}></div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => {
            const discountedPrice = item.price - item.discount;
            const itemTotal = discountedPrice * item.quantity;
            
            return (
              <div className={styles.cartRow} key={item.id}>
                <div className={styles.colProduct}>
                  <div className={styles.productImage}>
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.title}
                    />
                  </div>
                  <div className={styles.productTitle}>
                    <h4>{item.title}</h4>
                  </div>
                </div>
                
                <div className={styles.colPrice}>
                  <span className={styles.originalPrice}>₹{item.price}</span>
                </div>
                
                <div className={styles.colDiscount}>
                  <span className={styles.discountBadge}>-₹{item.discount}</span>
                </div>
                
                <div className={styles.colQuantity}>
                  <div className={styles.quantitySelector}>
                    <button 
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                
                <div className={styles.colTotal}>
                  <span className={styles.totalPrice}>₹{itemTotal}</span>
                </div>
                
                <div className={styles.colAction}>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className={styles.cartSummary}>
          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span>Original Total:</span>
              <span>₹{originalTotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Total Discount:</span>
              <span className={styles.discountAmount}>-₹{totalDiscount}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery Charge:</span>
              <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
              <span>Grand Total:</span>
              <span>₹{grandTotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>You Save:</span>
              <span className={styles.savingsAmount}>₹{totalDiscount}</span>
            </div>
          </div>
          
          <div className={styles.summaryActions}>
            <button className={styles.continueBtn}>Continue Shopping</button>
            <button className={styles.checkoutBtn}>Proceed to Checkout</button>
          </div>
        </div>

        {/* Coupon Section */}
        <div className={styles.couponSection}>
          <div className={styles.couponInput}>
            <input type="text" placeholder="Enter coupon code" />
            <button>Apply Coupon</button>
          </div>
          <p className={styles.couponNote}>Get additional 10% off on orders above ₹10,000</p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Card;
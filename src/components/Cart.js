import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const Cart = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <form>
    <div>
      <h3>Your Cart</h3>
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" data-cy="email"/><br/>
        <div>{nodes}</div>
        <p data-cy="total">Total: &#36;{total}</p>
        <button onClick={onCheckoutClicked} data-cy="checkoutBtn"
          disabled={hasProducts ? '' : 'disabled'}>
          Checkout
        </button>
      </div>
      </form>
        )
}

        Cart.propTypes = {
          products: PropTypes.array,
        total: PropTypes.string,
        onCheckoutClicked: PropTypes.func
}

        export default Cart

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Proptypes from 'prop-types';

import {
  MdAdd,
  MdRemove,
  MdDeleteForever,
  MdRemoveShoppingCart,
} from 'react-icons/md';
import { formatPrice } from '../../Util/format';
import * as CartActions from '../../store/modules/cart/actions';
import colors from '../../styles/color';

import { Container, ProductTable, Total, EmptyContainer } from './styles';

function Cart({ total, cart, RmFromCart, updateAmountRequest }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      {cart.length ? (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>PRODUCT</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map(product => (
                <tr>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button type="button" onClick={() => decrement(product)}>
                        <MdRemove size={20} color="#7159c1" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button type="button" onClick={() => increment(product)}>
                        <MdAdd size={20} color="#7159c1" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong> {product.subtotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => RmFromCart(product.id)}
                    >
                      <MdDeleteForever size={20} color="#7159c1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
          <footer>
            <button type="button">Checkout</button>
            <Total>
              <span> Request total</span>
              <strong>{total}</strong>
            </Total>
          </footer>{' '}
        </>
      ) : (
        <EmptyContainer>
          <MdRemoveShoppingCart size={64} color={colors.whiteContrast} />
          <p>Your Shopping Cart is empty.</p>
        </EmptyContainer>
      )}
    </Container>
  );
}
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

Cart.propTypes = {
  total: Proptypes.string.isRequired,
  cart: Proptypes.shape().isRequired,
  RmFromCart: Proptypes.func.isRequired,
  updateAmountRequest: Proptypes.func.isRequired,
};

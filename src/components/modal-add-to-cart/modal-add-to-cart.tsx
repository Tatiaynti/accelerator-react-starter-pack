import ReactFocusLock from 'react-focus-lock';
import { useDispatch, useSelector } from 'react-redux';
import { setGuitarsInCart, setGuitarsInCartCount } from '../../store/action';
import { getGuitarsInCart, getGuitarsInCartCount } from '../../store/selectors';
import { GuitarType } from '../../types/guitar';
import { changeGuitarTypeToReadable } from '../../utils/utils';

type ModalAddToCartProps = {
  guitar: GuitarType,
  onAddToCardModalClose: () => void,
  onSuccessModalOpen: () => void,
}

function ModalAddToCart({ guitar, onAddToCardModalClose, onSuccessModalOpen }: ModalAddToCartProps): JSX.Element {
  const dispatch = useDispatch();
  const guitarsInCart = useSelector(getGuitarsInCart);
  const guitarsInCartCount = useSelector(getGuitarsInCartCount);

  const {previewImg, name, vendorCode, type, stringCount, price, id} = guitar;

  const handleAddToCartClick = () => {
    if (!guitarsInCart.some((guitarInCart) => guitarInCart.id === guitar.id)) {
      dispatch(setGuitarsInCart(guitar));
      dispatch(setGuitarsInCartCount({ id, count: 1 }));
    } else {
      const currentCountIndex = guitarsInCartCount.findIndex((count) => count.id === guitar.id);
      const currentCount = guitarsInCartCount[currentCountIndex].count;
      dispatch(setGuitarsInCartCount({ id, count: currentCount + 1 }));
    }

    onAddToCardModalClose();
    onSuccessModalOpen();
  };

  return (
    <ReactFocusLock>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal="" onClick={onAddToCardModalClose}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info"><img className="modal__img" src={`/${previewImg.replace('guitar', 'content/guitar')}`} alt={name} width="67" height="137" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{changeGuitarTypeToReadable(type)},<br /> {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price}₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" onClick={handleAddToCartClick}>Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onAddToCardModalClose}>
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalAddToCart;

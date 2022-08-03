import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { Link, useParams } from 'react-router-dom';

import { getCategories } from '../../actions/productActions';

function ProductCategories() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { catslug } = useParams();

  const {categories, error} = useSelector(state => state.categories);

  useEffect(() => {
    if(error) {
      alert.show(error);
    }
   dispatch(getCategories())
  }, [error,dispatch])

  return (
    <>
      <h3>Categories</h3>
      <ul className="catg-list">
        {categories && categories.map(category => (
          <li key={category._id} className={category.category_slug === catslug ? 'active' : ''}>
            {category.category_logo && (
              <span><img src={`/admin_uploads/${category.category_logo}`} alt={category.category_name} /></span>
            )}
            <Link to={`/category/${category.category_slug}`}>{category.category_name}</Link></li>
        ))}
          
      </ul>
    </>
  )
}

export default ProductCategories
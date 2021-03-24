import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions/categoryActions';
import Layout from '../../components/Layout/layout';
import Input from '../../UI/input/inputs';

const Category = () => {
  // state for add category modal
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setcategoryImage] = useState('');

  // state for modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // function to add category
  const handleClose = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImageFiles', categoryImage);

    // dispatch add category actions
    dispatch(addCategory(form));
    setShow(false);
  };

  // useSelector to get categories from store
  const category = useSelector((state) => state.category);

  // dispatch get category actions:get all category
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  // function to render category
  const renderCategory = (categories) => {
    let productCategories = [];
    for (let category of categories) {
      productCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategory(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return productCategories;
  };

  // fucntion to get category list/or create category list
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  // function to upload single file i.e file[0]
  const handleCategoryImage = (e) => {
    setcategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h3> Category page</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategory(category.categories)}</ul>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={categoryName}
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Category;

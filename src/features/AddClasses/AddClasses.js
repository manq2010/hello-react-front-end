import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClasses } from './addClassesSlice';

const AddClasses = () => {
//  Get greetings from Redux store:
//   const classItems = useSelector((state) => state.addClassesReducer);
  const classItems = useSelector((state) => state.addClassesReducer.classes);
  const classesStatus = useSelector((state) => state.addClassesReducer.status);
  const error = useSelector((state) => state.addClassesReducer.error);

  // Prepare Redux dispatch method:
  const dispatch = useDispatch();

  useEffect(() => {
    if (classesStatus === 'idle') {
      dispatch(fetchClasses());
    }
  }, [classesStatus, dispatch]);

  const newClassList = (classItem) => (
    <li key={classItem.id}>
      <p>{classItem.name}</p>
      <p>{classItem.description}</p>
      <p>{classItem.photo}</p>
      <p>{classItem.price}</p>
      <button type="button">Edit</button>
    </li>
  );

  let content;

  if (classesStatus === 'succeeded') {
    // content = classItems.classes.map((classItem) => newClassList(classItem));
    content = classItems.map((classItem) => newClassList(classItem));
  } else if (classesStatus === 'failed') {
    content = (
      <>
        <h1>classes not found</h1>
        <p>{error}</p>
      </>
    );
  }

  const valueInitialState = {
    name: '',
    description: '',
    photo: '',
    price: null,
    mentor_name: null,
    duration: null,
  };

  // Create form states:
  const [values, setValues] = useState(valueInitialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Add form onSubmit handler:
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const {
      name, description, photo, price, mentor_name, duration,
    } = values;
    if (name && description) {
      const classArray = {
        name,
        description,
        photo,
        price,
        mentor_name,
        duration,
        id: Date.now(),
      };
      await dispatch(addClass(classArray));
      await dispatch(fetchClasses());
      setValues('');
    }
  },
  [values, dispatch]);

  return (
    <section>

      <div>
        {content}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={values.name || ''}
          id="classItemId"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={values.description || ''}
          id="classItemId"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          value={values.photo || ''}
          id="classItemId"
          placeholder="photoUrl"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          value={values.price || null}
          id="clasItemId"
          placeholder="price"
          onChange={handleChange}
        />
      </form>
    </section>
  );
};

export default AddClasses;

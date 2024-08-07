import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';
import * as Yup from 'yup';
import { FaSearch } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function SearchBar({ onSearch }) {
    const handleSubmit = (values, actions) => {
        const newSubmit = values.topic;
        if (newSubmit === '') return;

        onSearch(newSubmit);
        actions.resetForm();
    }

    const FeedbackSchema = Yup.object().shape({
        topic: Yup.string().min(2, "Too short!").max(30, "Too long!").required('Topic is required!'),
    });

    return (
        <>
            <Formik
                initialValues={{ topic: '' }}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
                validateOnBlur={false} 
                validateOnChange={false}
            >
                {({ handleSubmit, errors }) => (
                    <Form className={css.container} onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();

                        if (errors.topic) {
                            toast.error(errors.topic);
                        }
                    }}>
                        <div className={css.inputContainer}>
                            <Field 
                                type="text"
                                name="topic"
                                autoComplete="off"
                                autoFocus
                                placeholder="Search images and photos"
                                className={css.input} />
                            <button
                                type="submit"
                                className={css.searchButton}>
                                <FaSearch />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

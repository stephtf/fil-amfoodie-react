import Footer from "../../../header/Footer";
import Header from "../../../header/Header";
import Appetizers from "../Appetizers";
import lumpia from "../recipe-photos/lumpia.jpg";
import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_COMMENT } from "../../../../utils/mutations";

const LumpiangShanghai = () => {

  // adding new data to formData state
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target 

    setFormData(prevData => {
      return {
        ...prevData, 
        [name]: value
      }
    })
  }  

  // adding new formdata to the database
  // const [ data ] = useMutation(ADD_COMMENT) 

  const handleFormSubmit = (event) => {
    event.preventDefault(); 
    console.log(formData);

    // try {
    //   const { data } = await addComment({
    //     variables: { ...formData }, 
    //   })
    //   console.log(formData); 
    // } catch (err) {
    //   console.error(err);
    // }

  }
    // try {
    //   const { data } = await addComment({
    //     variables: { ...formData },
    //   })
    //   console.log(data);
    // } catch (err) {
    //   console.error(err);
    // }

    // setFormData({
    //   name: '',
    //   message: '',
    // });
  

  return (
    <div>
      <Header />
      <div className="body-container">
        <h2 className="space-below-10 recipe-titles">Lumpiang Shanghai</h2>
        <h3 className="center-text">Fried and yummy</h3>
        <img
          className="main-image space-below-25"
          src={lumpia}
          alt="lumpia in a paper bowl"
        />

        <div className="ingredients-container">
          <div className="ingredients-subcontainer">
            <h4>Ingredients</h4>
            <ul className="bullet-points">
              <li>1 package spring roll wrapper</li>
              <li>1/2 lb ground pork</li>
              <li>1/2 lb ground beef</li>
              <li>1/2 cup shredded carrots</li>
              <li>1/2 cup minced onions</li>
              <li>1/2 cup chopped cilantro</li>
              <li>1 tsp salt</li>
              <li>1 tsp ground black pepper</li>
              <li>1 tsp garlic powder</li>
              <li>1 large egg</li>
              <li>2 tbsp Worcestershire sauce (optional)</li>
              <li>vegetable or canola oil for deep frying</li>
            </ul>
            <h4 className="space-above-25">Instructions</h4>
            <ol className="instruction-list">
              <li>Prep your spring roll wrapper by peeling each individual sheet. Set aside
              </li>
              <li>
                Prepare your vegetables. Mince the onions, shred the carrots. Or, you could just buy already shredded carrots, which is what we do! Then chop up your cilantro.
              </li>
              <li>
                To a large mixing bowl, add the veggies with the raw ground pork, raw ground beef, spices, and optional Worcestershire. Mix well until all ingredients are evenly distributed. 
              </li>
              <li>
                Now you're ready to start wrapping. Take one spring roll wrapper and add one spoonful of the meat mixture to the bottom edge. Spread the meat mixture evenly across the wrapper, and then roll tightly until you have about one inch of wrapper left. At this point, take some raw scrambled egg with your fingers and spread it across the wrapper and continue to roll and seal it. The lumpia will be long and have open edges.  
              </li>
              <li>
                Take some kitchen shears and cut the long lumpia into thirds. This will allow for easier frying and eating! 
              </li>
              <li>
                Continue to roll the rest of the meat mixture until you run out of wrapper! 
              </li>
              <li>Once you are done with wrapping, now it's time to deep fry. Get your favorite deep frying pan and fill it until one eggroll will be fully submerged. It's okay to eyeball this step.
              </li>
              <li>When the oil is heated (keep it on medium heat), throw in the lumpia and cook until golden brown.
              </li>
            </ol>
          </div>
        </div>

        <div className='space-above-50'>
          <div>
            <h2 className="text-center space-below-25">Comments</h2>
          </div>
          <form className='comment-group space-below-25'>
            <h3 className='space-below-10'>Post a Comment</h3>
            <label htmlFor='name' className='form-label'>Name </label>
            <input onChange={handleChange} type='name' value={formData.name} name='name' className='form-style textbox-style' required/>
            <label htmlFor='message' className='form-label'>Message </label>
            <textarea onChange={handleChange} rows='5' type='message' value={formData.message} name='message' className='form-style textbox-style' required/>
            <button onClick={handleFormSubmit} className='form-button'>Post</button>
          </form>
        </div>
      </div>

  <div className='space-above-50'>
    <Appetizers />
  </div>

      <Footer />
    </div>
  );
};

export default LumpiangShanghai;

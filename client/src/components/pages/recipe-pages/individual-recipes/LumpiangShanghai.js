import Footer from "../../../header/Footer";
import Header from "../../../header/Header";
import Appetizers from "../Appetizers";
import lumpia from "../recipe-photos/lumpia.jpg";
import { useState, useEffect } from "react";
import moment from "moment";

const LumpiangShanghai = () => {
  const recipeName = "Lumpiang Shanghai";

  // comments - adding new form data to state
  const [formData, setFormData] = useState({
    recipe: `${recipeName}`,
    name: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // comments - posting comment data from state to database
  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("https://www.filamfoodie.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newComment) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // comments - show/hide comment form box upon user click
  const handleNewComment = () => {
    const commentForm = document.getElementsByClassName("show-comment")[0];
    commentForm.style.display = "block";
  };

  const hideNewComment = () => {
    const commentForm = document.getElementsByClassName("show-comment")[0];
    commentForm.style.display = "none";
  };

  // replies - adding new form data to state
  const [replyData, setReplyData] = useState({
    replies: {
      name: "",
      replyMessage: "",
    },
  });

  const handleReplyChange = (event) => {
    const { name, value } = event.target;

    setReplyData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // replies - posting reply data from state to database (replies of another user's comment)
  const handleReplyPost = (event) => {
    event.preventDefault();
    const postReplyButton = document.getElementsByClassName("post-reply-button")[0];
    const commentId = postReplyButton.value;

    fetch(`https://www.filamfoodie.com/replies/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(replyData),
    })
      .then((res) => res.json())
      .then((newReply) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // comments and replies - fetching all recipe data from database
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    fetch(`https://www.filamfoodie.com/comments/${recipeName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((comments) => {
        setCommentData(comments.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // parse the timestamp and then convert moment into UTC to make comparison using .from() method
  const parsetime = (timestamp) => {
    let postdate = timestamp.split("-");
    let postDate2 = timestamp.split('.')[0];
    postDate2=postDate2.replace('T','-');
    postDate2=postDate2.replace(/:/gi,'-');
    let postDate3 = postDate2.split('-');
        if (postdate[2]) {
          let othervalue = postdate[2].split("T");
          postdate[2] = othervalue[0];
          postdate.pop();
        }
    let nowTime = moment().utc().format("YYYY-MM-DD-HH-mm-ss");
    let fromNowValues = nowTime.split("-");
    
    return moment(postDate3).from(moment(fromNowValues))
      
}

  // when 'reply' is clicked - hide reply button and display cancel button
  const [replyForm, setReplyForm] = useState("");
  const handleReply = (id) => {
    setReplyForm(id);
    const replyButtons = document.getElementsByClassName('reply-button');
    const hideButtons = document.getElementsByClassName("cancel-button");

    for (let i = 0; i < replyButtons.length; i++) {
      let replyBtn = replyButtons[i];
      if(replyBtn.value === id) {
        replyBtn.style.display = 'none'; 
      } else {
        replyBtn.style.display = 'block';
      }
    }

    for (let i = 0; i < hideButtons.length; i++) {
      let cancelBtn = hideButtons[i];
      if (cancelBtn.value === id) {
        cancelBtn.style.display = "block";
      }
    }
  };

  // when 'cancel' is clicked - hide cancel button and display reply button
  const handleHide = (id) => {
    setReplyForm("");
    const replyButton = document.getElementById(`${id}`);
    replyButton.style.display = "block";
    const hideButton = document.getElementsByClassName("hide-button");
    for (let i = 0; i < hideButton.length; i++) {
      let mybutton = hideButton[i];
      if (mybutton.value === id) {
        mybutton.style.display = "none";
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="body-container">
      <div className='content-container'>
          <div className='content-wrapper'>
        <h2 className="space-below-10 recipe-titles">{recipeName}</h2>
        <h3 className="center-text">Fried and yummy</h3>
        <img
          className="main-image space-below-25"
          src={lumpia}
          alt="lumpia in a paper bowl"
        />

        <div className="ingredients-container space-below-75">
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
              <li>
                Prep your spring roll wrapper by peeling each individual sheet.
                Set aside
              </li>
              <li>
                Prepare your vegetables. Mince the onions, shred the carrots.
                Or, you could just buy already shredded carrots, which is what
                we do! Then chop up your cilantro.
              </li>
              <li>
                To a large mixing bowl, add the veggies with the raw ground
                pork, raw ground beef, spices, and optional Worcestershire. Mix
                well until all ingredients are evenly distributed.
              </li>
              <li>
                Now you're ready to start wrapping. Take one spring roll wrapper
                and add one spoonful of the meat mixture to the bottom edge.
                Spread the meat mixture evenly across the wrapper, and then roll
                tightly until you have about one inch of wrapper left. At this
                point, take some raw scrambled egg with your fingers and spread
                it across the wrapper and continue to roll and seal it. The
                lumpia will be long and have open edges.
              </li>
              <li>
                Take some kitchen shears and cut the long lumpia into thirds.
                This will allow for easier frying and eating!
              </li>
              <li>
                Continue to roll the rest of the meat mixture until you run out
                of wrapper!
              </li>
              <li>
                Once you are done with wrapping, now it's time to deep fry. Get
                your favorite deep frying pan and fill it until one eggroll will
                be fully submerged. It's okay to eyeball this step.
              </li>
              <li>
                When the oil is heated (keep it on medium heat), throw in the
                lumpia and cook until golden brown.
              </li>
            </ol>
          </div>
        </div>

    <div className='kuwento space-below-75'>
        <h2 className='text-center space-below-25'>Kuwento</h2>
        <h3>May 14, 2022</h3>
        <p className='kuwento-paras'>Lumpiang Shanghai is a common Filipino appetizer or side that we grew up eating most frequently at Filipino parties, birthdays, or other special events. It’s very similar to Chinese and other Asian eggrolls or springrolls. As the name suggests, Filipino lumpia has its origins in Chinese cuisine via the arrival of Chinese immigrants to the Philippines as early as 900AD. Yet, it does have a uniquely pinoy flavor that distinguishes it. 
        </p>
        <p className='kuwento-paras'>For me, lumpiang shanghai brings back memories as a child when I would help my mom with food prep the night before a big party we were hosting. We would roll a ton of lumpia in advance, and chill it in the fridge so that it would be ready for deep frying the next day. My job was always to help peel apart the lumpia wrapper, which comes stuck together when you buy them from the grocery store. I would also help with the rolling, but my favorite part was eating the raw lumpia wrapper whenever my mom wasn’t looking! 
        </p>
        <p className='kuwento-paras'>If we weren’t making lumpiang shanghai fresh for a party, we would make a bunch in advance and then freeze it. To this day, I still have frozen lumpiang shanghai in my freezer, which is perfect for when Gian or I get the craving for this delicious fried food. I highly recommend making a big batch and then freezing them. Trust me, you will want more! 
        </p>
        <p className='kuwento-subtitle'>Tips and Tricks</p>
        <p className='kuwento-paras'>One tip I have is for rolling. If it’s your first time rolling eggrolls, don’t feel discouraged if your lumpia turns out looking strange. It really does take practice to get them looking as good as they taste! The key is to roll as tightly as you can. Otherwise, you will end up with air pockets that will allow the <i>laman</i> (filling) to seep out during frying, and this will affect its crispness and shape. I also recommend using a thin layer of meat. I usually use about a tablespoon per roll. If you use too much filling, it may ooze out of the ends of the wrapper, which is not what you want! After making a few of them, you will get a sense of the perfect amount of filling to include to prevent the oozing and ensure that you don’t have empty pockets. 
        </p>
        <p className='signature'>xoxo Steph</p>
      </div>

        <div className="space-above-50">
          <div>
            <h2 className="text-center space-below-25">Comments</h2>
            <h3
              className="comment-group post-title"
              onClick={handleNewComment}
            >
              Post a Comment
            </h3>
            <form
              className="comment-group show-comment"
              style={{ display: "none" }}
            >
              <div className="newcomment-box">
                <label htmlFor="name" className="form-label">
                  Name{" "}
                </label>
                <input
                  onChange={handleChange}
                  type="name"
                  value={formData.name}
                  name="name"
                  className="form-style textbox-style"
                  required
                />
                <label htmlFor="message" className="form-label">
                  Message{" "}
                </label>
                <textarea
                  onChange={handleChange}
                  rows="5"
                  type="message"
                  value={formData.message}
                  name="message"
                  className="form-style textbox-style"
                  required
                />
                <div className="reply-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={hideNewComment}
                  >
                    Cancel
                  </button>
                  <button className="post-button" onClick={handleFormSubmit}>
                    Post
                  </button>
                </div>
              </div>
            </form>
            {commentData &&
              commentData.map((comment) => {
                return (
                  <div className="comment-box" key={comment._id}>
                    <div className="subcomment-box">
                      <h5 className="comment-name">{comment.name}</h5>
                      <small>{parsetime(comment.timestamp)}</small>

                      <p className="comment-message">{comment.message}</p>
                      <button
                        className="reply-button"
                        onClick={() => handleReply(`${comment._id}`)}
                        value={comment._id} id={comment._id}
                      >
                        Reply
                      </button>
                    </div>
                    {replyForm === `${comment._id}` && (
                      <form className="reply-group space-below-25">
                        <h3 className="space-below-10">Post a Reply</h3>
                        <label htmlFor="name" className="form-label">
                          Name{" "}
                        </label>
                        <input
                          type="name"
                          name="name"
                          className="form-style textbox-style"
                          onChange={handleReplyChange}
                          required
                        />
                        <label htmlFor="message" className="form-label">
                          Message{" "}
                        </label>
                        <textarea
                          rows="4"
                          type="message"
                          name="replyMessage"
                          className="form-style textbox-style"
                          onChange={handleReplyChange}
                          required
                        />
                        <div className="reply-buttons">
                          <button
                            className="cancel-button"
                            onClick={() => handleHide(`${comment._id}`)}
                            value={comment._id}
                          >
                            Cancel
                          </button>
                          <button
                            className="post-button post-reply-button"
                            value={comment._id}
                            onClick={handleReplyPost}
                          >
                            Post
                          </button>
                        </div>
                      </form>
                    )}
                    <hr></hr>
                    <div className="replies-box">
                      {comment.repliesCount > 1 || comment.repliesCount < 1 ? (
                        <small className="space-below-10">
                          {comment.repliesCount} Replies
                        </small>
                      ) : (
                        <small className="space-below-10">
                          {comment.repliesCount} Reply
                        </small>
                      )}

                      {comment.replies.map((replies) => {
                        return (
                          <div key={replies._id} className="subcomment-box">
                            <h5 className="comment-name">{replies.name}</h5>
                            <small>{parsetime(replies.timestamp)}</small>
                            <p className="comment-message space-below-10">
                              {replies.replyMessage}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <h2 className="text-center space-above-75 space-below-25">
          Check out these other appetizers!
        </h2>
        </div>
        </div>
        <div className="space-above-10">
          <Appetizers />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LumpiangShanghai;

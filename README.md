#Deployed site: https://carpfairy.github.io/f23-pui-fp/main.html

-------------------------------------------------------------------------------
#Part I - Synopsis (298 words)
The purpose of my website, “Blend”, is to educate clothing shoppers about the different types of fabrics that comprise their clothing. A user interacts with Blend by first looking for the fabric composition listed on the tag on the inside of their clothing. Then, they type what they see and input it into Blend. Or, they can navigate to the “Composition” section of an online shopping page, copy the fabric composition, and paste it into Blend. The user also has the option to select what type of clothing they want to blend for in a dropdown menu. For each material that the user entered, Blend will return information about its strengths and weaknesses, its source and environmental impact, and how to properly care for it. If the user decides to input what type of clothing they are “blending” for, they will also receive a personalized recommendation of what kind of material is best for that clothing. 

The target audience for my website is online clothing shoppers. I am an avid online shopper myself, and I noticed a specific user need that was not being addressed. There is often ambiguity over whether an item of clothing is high quality and worth the price tag, especially when it does not have customer reviews. Through both research and personal trial and error, I identified that the fabric composition is a reliable way to determine clothing quality. This information is available to the user before purchase. Consequently, online shoppers will find my site interesting, engaging, and useful because they are able to learn information that actively benefits their online shopping user experience. 

Recently, there has been an increase in consumer interest regarding sustainable fashion. My site also offers value to those who want to know the environmental impact of their shopping habits. 

-------------------------------------------------------------------------------
#Part II - Interaction Instructions
Navigate to carpfairy.github.io/f23-pui-fp/main.html.
View on desktop (Recommended 1280px width)
View on tablet 
Navigate to a the “Composition” section of an online shopping site, OR find an item of clothing that has the fabric composition listed on the tag
Sample links from many different popular shopping sites:
Link 1 from UNIQLO: Souffle Yarn Crew Neck Long-Sleeve Sweater
Link 2 from H&M: Slacks - Black - Ladies | H&M US
Link 3 from Zara: DECONSTRUCTED BLAZER LIMITED EDITION
Link 4 from Urban Outfitters: UO Harley Sequin Halter Maxi Dress
Link 5 from GAP: Gap Arch Logo Hoodie

Click on the dropdown menu and select which type of clothing you are blending for. This entry is optional. 
For example, if I clicked on Link 1 from UNIQLO, I would select “Pants” from the dropdown menu

Copy and paste the fabric composition into the text box, OR type it as you see from the tag. Please make sure each fabric entry is separated by a comma for the best experience
Here are sample fabric compositions that are taken directly from the sites above. You can copy and paste these for convenience; they are exactly the same as shown on the links above
Link 1 from UNIQLO: 55% Acrylic, 35% Nylon, 7% Wool, 3% Spandex
Link 2 from H&M: Polyester 50%, Cotton 47%, Spandex 3%
Link 3 from Zara: 59% polyester, 4% acrylic, 32% wool, 3% polyamide, 2% viscose
Link 4 from Urban Outfitters: 100% Polyester
Link 5 from GAP: Polyester 23%, Cotton 77%

Click “submit” to see the results for your fabric blend. If you have selected a clothing item from the dropdown menu, you will also receive a personalized recommendation from me.

-------------------------------------------------------------------------------

#Part III - External Tools
jQuery: In order to display the correct information for each fabric, I uploaded the text as txt files. I then used jQuery to help me dynamically call on the txt files based on what fabrics the user has inputted, and load them onto the HTML page. 

This helps me create a customized experience for the user, so that the website feels engaging and responsive to their personal clothing item. It also limits the amount of reading the user has to do, which helps prevent information overload. 

ScrollReveal: ScrollReveal loads the components of the HTML page after a designated delay based on where the user’s mouse is. I used ScrollReveal on the results page of my site. This helps the page feel less static when the results are loaded, and makes it appear more modern and visually interesting. 

typed.js: I used type.js to help me build the typing animation on the main page of my site. I used it in order to provide the user with different examples of what you could use Blend for. This is an unobtrusive and visually appealing way to give them more context to the sight. Furthermore, it fits well with my design and aesthetic preferences.

gif on main page: I used a “hidden” gif that only plays when the user puts their mouses over the image on the main landing page. I did this to provide the user with imagery of various fabric textures, so that I could engage their sense of touch through their sense of vision. 

I did not want to overwhelm or distract users with a constantly moving gif. I “hid” the interaction by only playing it when the user mouses over. This also provided a small extra layer of interactivity.


blotter.JS: blotterJS is a text animation library. This was used in several interactions of my project in order to add visual engagement. However, it was removed at the very end after user testing for being too distracting and not accessibility friendly. 

-------------------------------------------------------------------------------
#Part IV

My initial project proposals involved an interactive pie chart, where users could add slices to the pie chart for each fabric type. Then, users would drag the edge/borders of each pie slice in order to change the percentage values. 

However, the user feedback was that the idea was hard to understand and difficult to use. Furthermore, it required the user to click and drag the mouse, and therefore was not accessibility friendly. 

Through several iterations of user testing, I realized I needed to significantly simplify the interaction process. I gave up some aspects of interactivity in order to promote efficiency and ease of use. The final product is incredibly simple, and fulfills its intended purpose exactly. 

Old Iteration:

-------------------------------------------------------------------------------
#Part V
I ran into several challenges over the course of the project. I struggled with meeting my established timeline deadlines. This is because I was receiving a lot of negative feedback on my initial pie chart idea. It took me time to step away from the pie 

because I was receiving a lot of feedback on my initial iteration tha

trying to find ways to handle different user inputs. For example, a user may input fabric out of composition order (ex: “Cotton 30%, Polyester 50%, Acrylic 20%”). However, I wanted Blend to return the fabrics in order, since the greatest percentage composition matters the most. Furthermore, I spent a lot of time thinking of test cases and edge cases where the site might not understand. For example, what happens when the fabric percentages don’t add to 100%? 


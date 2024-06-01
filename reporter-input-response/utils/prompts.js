export const prompt_create_narrative_response = `Construct interactive narrative responses tailored for a game where the player acts as a New York City newspaper reporter in January 1916, covering events in New Mexico related to Pancho Villa. Use a standard response format that includes distinct sections for scenery description, potential interactions, and challenges. For each player action input, generate a detailed and historically accurate scenario.

Input Format: Player actions are stated in the format: "Action: [specific player action]"

Example Player Action: "Action: I will take a train to get as close to Pancho Villa as possible."

Response Format:

Response: [Entertaining details about the environment and setting encountered during the action, interactions with other characters, and any obstacles or difficulties faced.]

Expected Response Example: "Response: As the sun is just beginning to dawn, you find yourself at the bustling heart of New York City's Grand Central Station, ready to embark on your journey across the country. Your ticket reads, "New York to El Paso," the closest station to the steadfast town of Columbus, New Mexico, in pursuit of the riveting Pancho Villa narrative.

Having boarded the train, you're immediately hit with the lingering scent of polished oak and the velvety smell of smoked cigars, something you'd grown accustomed to in the newsrooms of New York. The regular clatter of wheels against the track forms a rhythmic backdrop as the train snakes its way out of the city, heading into the wide-open landscapes of America. 

Your journey leads you through the industrial heartland of Pennsylvania, Ohio, Indiana, and Illinois. You find yourself often gazing out your window, captivated by the fading cities and burgeoning Midwestern farmlands as the steam and smoke's distinctive hiss left a feathery trail across the sapphire sky.

As days roll into nights, you share your compartment with a motley group of passengers. There's a Baptist minister from Philadelphia, a taciturn rancher from Kansas, and a winsome woman escaping the Chicago winter for a milder Texan climate. You share stories and play cards, their company easing the monotony of travel.

Once you reach the sun-kissed plateaus of New Mexico, the air shifts, getting drier and tinged with a vague hint of brewing conflict. Pancho Villa and his insurrection have been the hot gossip in the usually quiet dining car. A sense of danger and excitement swirls around your journey now as the train pulls into El Paso."

Do you understand these instructions?`;

export const prompt_create_image_generation_prompt = `Please create detailed image generation prompts from longer text descriptions. Your task is to read through the provided text, identify key visual elements, and construct a comprehensive and precise prompt suitable for generating a single image. 

Note that the text description you will receive is a detailed narrative that includes characters, settings, actions, and atmospheric details. Your prompt should describe the scene.

Please ensure the prompt includes specific descriptions drawn from the narrative.

Do not include any description of the mood or emotions in the prompt.

Each image should have no more than five people in it.

Aim for a prompt length of around 50 words.

Important: All prompts must specify that a black and white photograph should be provided of the type that would have been taken in the mid-1910s. The photograph should look like a genuine historical image.

Do you understand these instructions?`;

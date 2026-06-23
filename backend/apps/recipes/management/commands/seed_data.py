"""
Management command: seed_data
Seeds the database with all hardcoded recipe data from the original React Native app.
Run with: python manage.py seed_data
"""

from django.core.management.base import BaseCommand
from apps.recipes.models import Category, Recipe
from apps.ingredients.models import Ingredient, RecipeIngredient


# ── Raw data ported from the original dataArrays.js ───────────────────────────

CATEGORIES = [
    {'id': 0, 'name': 'Pizza',        'photo_url': 'https://amp.businessinsider.com/images/5c084bf7bde70f4ea53f0436-750-563.jpg'},
    {'id': 1, 'name': 'Mexican Food', 'photo_url': 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg'},
    {'id': 2, 'name': 'Italian Food', 'photo_url': 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'},
    {'id': 3, 'name': 'Cookies',      'photo_url': 'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400'},
    {'id': 4, 'name': 'Smoothies',    'photo_url': 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/still-life-of-three-fresh-smoothies-in-front-of-royalty-free-image-561093647-1544042068.jpg?crop=0.715xw:0.534xh;0.0945xw,0.451xh&resize=768:*'},
]

INGREDIENTS = [
    {'id': 0,  'name': 'Oil',            'photo_url': 'https://ak7.picdn.net/shutterstock/videos/27252067/thumb/11.jpg'},
    {'id': 1,  'name': 'Salt',           'photo_url': 'https://image.freepik.com/free-photo/sea-salt-wooden-bowl-isolated-white-background_29402-416.jpg'},
    {'id': 2,  'name': 'Russet potatoes','photo_url': 'http://www.valleyspuds.com/wp-content/uploads/Russet-Potatoes-cut.jpg'},
    {'id': 3,  'name': 'Paprika',        'photo_url': 'https://image.freepik.com/free-photo/red-chilli-pepper-powder-isolated-white-background_55610-28.jpg'},
    {'id': 4,  'name': 'Black Pepper',   'photo_url': 'https://ak0.picdn.net/shutterstock/videos/26741680/thumb/1.jpg'},
    {'id': 5,  'name': 'Celery salt',    'photo_url': 'https://www.hasiroglugurme.com/images/urunler/Koftelik-Esmer-Bulgur-resim-297.jpg'},
    {'id': 6,  'name': 'Dried sage',     'photo_url': 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Esxjvv7/super-slow-motion-dried-sage-falling-on-white-background_n1xg2gxzg__F0000.png'},
    {'id': 7,  'name': 'Garlic powder',  'photo_url': 'https://us.123rf.com/450wm/belchonock/belchonock1808/belchonock180818180/106007144-bowl-of-dry-garlic-powder-on-white-background.jpg?ver=6'},
    {'id': 8,  'name': 'Ground allspice','photo_url': 'https://www.savoryspiceshop.com/content/mercury_modules/cart/items/2/6/9/2695/allspice-berries-jamaican-ground-1.jpg'},
    {'id': 9,  'name': 'Dried oregano',  'photo_url': 'https://frutascharito.es/886-large_default/oregano.jpg'},
    {'id': 10, 'name': 'Dried basil',    'photo_url': 'https://www.honeychop.com/wp-content/uploads/2015/09/Dried-Mint.png'},
    {'id': 11, 'name': 'Dried marjoram', 'photo_url': 'https://images-na.ssl-images-amazon.com/images/I/71YATIBqBYL._SX355_.jpg'},
    {'id': 12, 'name': 'All-purpose flour','photo_url': 'https://images.assetsdelivery.com/compings_v2/seregam/seregam1309/seregam130900036.jpg'},
    {'id': 13, 'name': 'Brown sugar',    'photo_url': 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BALQTtekliuc6iu4u/rotating-brown-sugar-in-a-white-container-on-white-background_sis0xtbyl_thumbnail-full01.png'},
    {'id': 14, 'name': 'Kosher salt',    'photo_url': 'https://d1yn1kh78jj1rr.cloudfront.net/image/preview/r64-6MxPQjlatyfjp/storyblocks-top-view-of-ceramic-salt-cellar-with-coarse-grained-sea-salt-isolated-on-white-background_SPzKionPuV_SB_PM.jpg'},
    {'id': 15, 'name': 'Whole chicken',  'photo_url': 'https://image.shutterstock.com/image-photo/two-raw-chicken-drumsticks-isolated-260nw-632125991.jpg'},
    {'id': 16, 'name': 'Eggs',           'photo_url': 'https://image.shutterstock.com/image-photo/egg-whites-yolk-cup-isolated-260nw-1072453787.jpg'},
    {'id': 17, 'name': 'Quarts neutral oil','photo_url': 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fgettyimages-464433694_0.jpg%3Fitok%3DK42YR2GV&w=400&c=sc&poi=face&q=85'},
    {'id': 18, 'name': 'Water',          'photo_url': 'https://ak1.picdn.net/shutterstock/videos/829561/thumb/11.jpg'},
    {'id': 19, 'name': 'Onion Powder',   'photo_url': 'https://image.shutterstock.com/image-photo/mixed-spices-isolated-on-white-260nw-662383828.jpg'},
    {'id': 20, 'name': 'MSG',            'photo_url': 'https://img.freepik.com/free-photo/monosodium-glutamate-wood-spoon-white-background_55883-399.jpg?size=626&ext=jpg'},
    {'id': 21, 'name': 'Chicken Breast', 'photo_url': 'https://us.123rf.com/450wm/utima/utima1602/utima160200063/53405187-raw-chicken-breast-fillets.jpg?ver=6'},
    {'id': 22, 'name': 'Onion chopped',  'photo_url': 'https://s3.envato.com/files/246703499/IMG_1752_5.jpg'},
    {'id': 23, 'name': 'Tomato paste',   'photo_url': 'http://d3e1m60ptf1oym.cloudfront.net/45bab59a-363c-11e1-ab4e-bf4c2e0bb026/PANELA_xgaplus.jpg'},
    {'id': 24, 'name': 'Chilli Powder',  'photo_url': 'https://us.123rf.com/450wm/nuttapong/nuttapong1505/nuttapong150500009/40458002-paprika-powder-isolated-on-white-background.jpg?ver=6'},
    {'id': 25, 'name': 'Ground Beef',    'photo_url': 'https://images.radio.com/kmoxam/s3fs-public/styles/nts_image_cover_tall_775x425/public/dreamstime_s_39607998.jpg'},
    {'id': 26, 'name': 'Can kidney beans, rinsed and drained','photo_url': 'https://www.seriouseats.com/images/2014/04/20140414-pile-of-beans-primary-1500x1125.jpg'},
    {'id': 27, 'name': 'Large Tortillas','photo_url': 'https://upload.wikimedia.org/wikipedia/commons/5/56/NCI_flour_tortillas.jpg'},
    {'id': 28, 'name': 'Fritos',         'photo_url': 'https://previews.123rf.com/images/ksena32/ksena321510/ksena32151000090/45863494-fried-fish-on-a-white-background.jpg'},
    {'id': 29, 'name': 'Shredded cheddar','photo_url': 'https://image.shutterstock.com/image-photo/top-view-small-bowl-filled-260nw-284460308.jpg'},
    {'id': 30, 'name': 'Lime',           'photo_url': 'https://ak8.picdn.net/shutterstock/videos/23271748/thumb/1.jpg'},
    {'id': 31, 'name': 'Ground cumin',   'photo_url': 'https://image.shutterstock.com/image-photo/pile-cumin-powder-isolated-on-260nw-1193262853.jpg'},
    {'id': 32, 'name': 'Cayenne pepper', 'photo_url': 'https://ak7.picdn.net/shutterstock/videos/11461337/thumb/1.jpg'},
    {'id': 33, 'name': 'Flaky white fish','photo_url': 'https://image.shutterstock.com/image-photo/roach-river-fish-isolated-on-260nw-277764143.jpg'},
    {'id': 34, 'name': 'Avocado',        'photo_url': 'https://www.redwallpapers.com/public/redwallpapers-large-thumb/avocado-cut-stone-leaves-white-background-free-stock-photos-images-hd-wallpaper.jpg'},
    {'id': 35, 'name': 'Red Pepper Flakes','photo_url': 'https://as1.ftcdn.net/jpg/02/06/55/10/500_F_206551074_mVczUrAWOSMaw8kR48FQDQBqDw47jCtL.jpg'},
    {'id': 36, 'name': 'Onions',         'photo_url': 'http://www.allwhitebackground.com/images/2/2650.jpg'},
    {'id': 37, 'name': 'Green Pepper',   'photo_url': 'https://ak9.picdn.net/shutterstock/videos/4055509/thumb/1.jpg'},
    {'id': 38, 'name': 'Red Pepper',     'photo_url': 'https://ak9.picdn.net/shutterstock/videos/10314179/thumb/1.jpg'},
    {'id': 39, 'name': 'Pizza dough',    'photo_url': 'https://image.shutterstock.com/image-photo/fresh-raw-dough-pizza-bread-260nw-518950903.jpg'},
    {'id': 40, 'name': 'Ketchup sauce',  'photo_url': 'https://st2.depositphotos.com/5262887/11050/i/950/depositphotos_110501208-stock-photo-ketchup-bowl-isolated-on-white.jpg'},
    {'id': 41, 'name': 'Hot Sauce',      'photo_url': 'https://media.istockphoto.com/photos/opened-can-of-spaghetti-sauce-on-a-white-background-picture-id497704752'},
    {'id': 42, 'name': 'Butter',         'photo_url': 'https://redrockstoffee.com/media/2016/11/AdobeStock_76417550.jpeg'},
    {'id': 43, 'name': 'Heavy Cream',    'photo_url': 'https://media.istockphoto.com/photos/mayonnaise-in-bowl-isolated-on-white-background-picture-id614981116'},
    {'id': 44, 'name': 'Whole-milk plain yogurt','photo_url': 'https://st.depositphotos.com/2757384/3317/i/950/depositphotos_33170129-stock-photo-pouring-a-glass-of-milk.jpg'},
    {'id': 45, 'name': 'Cheese',         'photo_url': 'https://ak7.picdn.net/shutterstock/videos/3619997/thumb/1.jpg'},
    {'id': 46, 'name': 'Mozzarella',     'photo_url': 'https://t3.ftcdn.net/jpg/02/06/73/98/500_F_206739841_suPu6qDPHlowFqx9qo8fLqV8sNevL2g3.jpg'},
    {'id': 47, 'name': 'Celery stalks',  'photo_url': 'https://cdn4.eyeem.com/thumb/6d1b3957c7caa9b73c3e0f820ef854b931808139-1538043742765/w/750'},
    {'id': 48, 'name': 'Parmesan Cheese','photo_url': 'https://ak7.picdn.net/shutterstock/videos/3721877/thumb/1.jpg'},
    {'id': 49, 'name': 'Pancetta',       'photo_url': 'https://previews.123rf.com/images/onlyfabrizio/onlyfabrizio1606/onlyfabrizio160600002/60198502-raw-stripes-of-pancetta-stesa-on-a-white-background.jpg'},
    {'id': 50, 'name': 'Spaghetti',      'photo_url': 'https://previews.123rf.com/images/mfron/mfron1204/mfron120400098/13306773-bunch-of-spaghetti-nudeln-isoliert-auf-weiem-hintergrund.jpg'},
    {'id': 51, 'name': 'Garlic',         'photo_url': 'https://image.freepik.com/free-photo/fresh-garlic-white-background_1339-17012.jpg'},
    {'id': 52, 'name': 'Lasagna noodles','photo_url': 'https://previews.123rf.com/images/velkol/velkol1110/velkol111000004/11083085-an-image-of-raw-lasagna-on-white-background.jpg'},
    {'id': 53, 'name': 'Italian sausage','photo_url': 'https://previews.123rf.com/images/arinahabich/arinahabich1504/arinahabich150400858/38827029-raw-italian-sausage-on-a-white-background-.jpg'},
    {'id': 54, 'name': 'Crushed Tomatoes','photo_url': 'https://previews.123rf.com/images/merkulovnik/merkulovnik1406/merkulovnik140600100/28751626-crushed-tomato-isolated-on-white-background.jpg'},
    {'id': 55, 'name': 'Sugar',          'photo_url': 'https://previews.123rf.com/images/sommai/sommai1411/sommai141100034/33199985-sugar-cubes-in-a-bowl-isolated-on-white-background.jpg'},
    {'id': 56, 'name': 'Minced fresh parsley','photo_url': 'https://t4.ftcdn.net/jpg/02/15/78/05/240_F_215780551_Eid0xpP1M2fokvuEcvJj8uqhROLJkb3p.jpg'},
    {'id': 57, 'name': 'Ricotta cheese', 'photo_url': 'https://previews.123rf.com/images/barkstudio/barkstudio1608/barkstudio160800351/61418602-ricotta-cheese-into-a-bowl-in-white-background.jpg'},
    {'id': 58, 'name': 'Fennel seed',    'photo_url': 'https://previews.123rf.com/images/pinkomelet/pinkomelet1710/pinkomelet171000227/88851299-close-up-the-fennel-seed-on-white-background.jpg'},
    {'id': 59, 'name': 'Banana',         'photo_url': 'https://www.conservationmagazine.org/wp-content/uploads/2013/04/sterile-banana.jpg'},
    {'id': 60, 'name': 'Frozen Strawberries','photo_url': 'https://www.cascadianfarm.com/wp-content/uploads/2018/12/Strawberries_Main_0218.png'},
    {'id': 61, 'name': 'Greek Yogurt',   'photo_url': 'http://images.media-allrecipes.com/userphotos/960x960/3758635.jpg'},
]

RECIPES = [
    {
        'category_id': 3, 'title': 'Oatmeal Cookies',
        'photo_url': 'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
        'photos_array': [
            'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
            'https://namelymarly.com/wp-content/uploads/2018/04/20180415_Beet_Lasagna_10.jpg',
        ],
        'time': '15',
        'description': '-- Start with cleaned and peeled russet potatoes that you have cut into 3/8-inch match sticks. Place in bowl of very cold water: keep rinsing and changing the water until the water is clear; drain thoroughly and dry with paper towels or a clean lint-free kitchen towel.\n\n -- Meanwhile, you preheat your hot oil to 350 degrees F. Place prepared taters in oil and cook about 5 minutes.',
        'ingredients': [[0, '200ml'], [1, '5g'], [2, '300g']],
    },
    {
        'category_id': 4, 'title': 'Triple Berry Smoothie',
        'photo_url': 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-how-to-make-a-smoothie-horizontal-1542310071.png?crop=0.803xw:0.923xh;0.116xw,0.00510xh&resize=768:*',
        'photos_array': [
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-how-to-make-a-smoothie-horizontal-1542310071.png?crop=0.803xw:0.923xh;0.116xw,0.00510xh&resize=768:*',
            'https://www.vitamix.com/media/other/images/xVitamix-Triple-Berry-Smoothie-square-crop__1.jpg.pagespeed.ic.OgTC3ILD3R.jpg',
        ],
        'time': '10',
        'description': 'In a blender, combine all ingredients and blend until smooth. Then divide between 2 cups and top with blackberries, if desired.',
        'ingredients': [[59, '1'], [60, '1/2 lbs'], [61, '1/2 liters']],
    },
    {
        'category_id': 3, 'title': 'Vegan Cookies',
        'photo_url': 'https://www.texanerin.com/content/uploads/2018/06/no-bake-lactation-cookies-1-650x975.jpg',
        'photos_array': [
            'https://www.texanerin.com/content/uploads/2018/06/no-bake-lactation-cookies-1-650x975.jpg',
            'https://ichef.bbci.co.uk/news/660/cpsprodpb/B2C0/production/_106106754_vegnuggets976.jpg',
        ],
        'time': '30',
        'description': '-- Beat the egg and then combine it with water in a bowl. Stir. Combine the flour, salt, MSG, pepper, onion powder and garlic powder in a gallon size zip lock bag.',
        'ingredients': [[0, '2 quarts'], [16, '1'], [12, '1 cup'], [18, '1 cup'], [19, '1 teaspoon'], [1, '2 teaspoons'], [4, '1/4 teaspoons'], [7, '1/8 teaspoons'], [20, '1/2 teaspoons'], [21, '4']],
    },
    {
        'category_id': 3, 'title': 'Pumpkin Spice Cookies',
        'photo_url': 'https://www.texanerin.com/content/uploads/2018/11/pumpkin-spice-cookies-4-650x975.jpg',
        'photos_array': [
            'https://www.texanerin.com/content/uploads/2018/11/pumpkin-spice-cookies-4-650x975.jpg',
            'https://cdn.junglecreations.com/wp/junglecms/2018/07/4164c5bd-wide-thumbnail.jpg',
        ],
        'time': '45',
        'description': '-- In a medium pot over medium heat, heat 1 tablespoon oil. Add onion and cook until soft, 5 minutes. Add garlic and cook until fragrant, 1 minute more.',
        'ingredients': [[0, '2 tablespoons'], [22, '1/2'], [23, '2 tablespoons'], [7, '2 cloves'], [3, '1 teaspoon'], [24, '1 tablespoon'], [25, '1 lb'], [1, '2 teaspoons'], [4, '2 teaspoons'], [26, '15 oz'], [27, '8'], [28, '2'], [29, '1 cup']],
    },
    {
        'category_id': 3, 'title': 'Brownies',
        'photo_url': 'https://www.texanerin.com/content/uploads/2018/01/coconut-flour-brownies-1-650x975.jpg',
        'photos_array': [
            'https://www.texanerin.com/content/uploads/2018/01/coconut-flour-brownies-1-650x975.jpg',
            'https://images-gmi-pmc.edge-generalmills.com/6fbc6859-e2b1-499d-b0fa-ada600c9cc3f.jpg',
        ],
        'time': '30',
        'description': '-- Preheat fryer to 350F. Thoroughly mix together all spices. Combine spices with flour, brown sugar and salt. Dip chicken pieces in egg white to lightly coat them, then transfer to flour mixture.',
        'ingredients': [[1, '2 tablespoons'], [3, '1 tablespoon'], [4, '1 teaspoon'], [5, '1/2 teaspoons'], [6, '1/2 teaspoons'], [7, '1/2 teaspoons'], [8, '1/2 teaspoons'], [9, '1/2 teaspoons'], [10, '1/2 teaspoons'], [11, '1/2 teaspoons'], [12, '1/2 cups'], [13, '1 tablespoon'], [14, '1 tablespoon'], [15, '2 breasts, 2 thighs'], [16, '1'], [17, '2 quarts']],
    },
    {
        'category_id': 1, 'title': 'Perfect Fish Tacos',
        'photo_url': 'https://hips.hearstapps.com/hmg-prod/images/190307-fish-tacos-112-1553283299.jpg',
        'photos_array': [
            'http://d2814mmsvlryp1.cloudfront.net/wp-content/uploads/2014/04/WGC-Fish-Tacos-copy-2.jpg',
            'https://thecozyapron.com/wp-content/uploads/2018/03/baja-fish-tacos_thecozyapron_1.jpg',
            'https://www.simplyrecipes.com/wp-content/uploads/2017/06/2017-07-22-FishTacos-6.jpg',
        ],
        'time': '35',
        'description': '-- In a medium shallow bowl, whisk together olive oil, lime juice, paprika, chili powder, cumin, and cayenne. Add cod, tossing until evenly coated. Let marinate 15 minutes.',
        'ingredients': [[30, 'juice of 1'], [24, '2 teaspoons'], [0, '3 tablespoons'], [3, '1 teaspoon'], [31, '1/2 teaspoons'], [32, '1/2 teaspoons'], [4, '2 teaspoons'], [33, '1/2 lb'], [27, '8'], [14, '2 teaspoons'], [34, '1']],
    },
    {
        'category_id': 1, 'title': 'Chicken Fajitas',
        'photo_url': 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/Flavorful-Chicken-Fajitas_EXPS_GHBZ18_12540_B08_15_8b.jpg',
        'photos_array': [
            'https://dadwithapan.com/wp-content/uploads/2015/07/Spicy-Chicken-Fajitas-22-1200x480.jpg',
            'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201403-xl-chipotle-chicken-fajitas.jpg?itok=ghVcI5SQ',
        ],
        'time': '35',
        'description': '-- In a large bowl, combine 2 tablespoons oil, lemon juice and seasonings; add the chicken. Turn to coat; cover. Refrigerate for 1-4 hours.',
        'ingredients': [[9, '1/2 teaspoons'], [0, '4 tablespoons'], [1, '1/2 teaspoons'], [30, '2 tablespoons'], [31, '1 teaspoon'], [7, '1 teaspoon'], [24, '1/2 teaspoons'], [3, '1/2 teaspoons'], [21, '1 pound'], [22, '1/2 cup'], [27, '6'], [36, '4'], [37, '1/2'], [38, '1/2']],
    },
    {
        'category_id': 2, 'title': 'Buffalo Pizza',
        'photo_url': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        'photos_array': [
            'https://www.tablefortwoblog.com/wp-content/uploads/2019/01/buffalo-chicken-pizza-recipe-photos-tablefortwoblog-3-500x500.jpg',
            'http://pizzachoicema.com/wp-content/uploads/2018/08/Buffalo-Chicken-Pizza.jpg',
        ],
        'time': '50',
        'description': '-- Place a rack in upper third of oven. Place a large cast-iron skillet on rack and preheat oven to 500 degrees. Place pizza dough in a large bowl, pour a little oil over, and turn to coat.',
        'ingredients': [[39, '1 lb'], [40, '1 cup'], [41, '1/2 cup'], [42, '1/4 cup'], [43, '2 tablespoons'], [44, '1/2 cup'], [7, '1/4 teaspoons'], [5, '1/4 teaspoons'], [30, '1/4 teaspoons'], [45, '2 oz'], [12, 'for dusting'], [4, '1/2 teaspoons'], [47, '2'], [46, '9 oz']],
    },
    {
        'category_id': 0, 'title': 'Classic Lasagna',
        'photo_url': 'https://namelymarly.com/wp-content/uploads/2018/04/20180415_Beet_Lasagna_10.jpg',
        'photos_array': [
            'https://namelymarly.com/wp-content/uploads/2018/04/20180415_Beet_Lasagna_10.jpg',
        ],
        'time': '15',
        'description': '-- Start with cleaned and peeled russet potatoes that you have cut into 3/8-inch match sticks.',
        'ingredients': [[0, '200ml'], [1, '5g'], [2, '300g']],
    },
    {
        'category_id': 2, 'title': 'Spaghetti Carbonara',
        'photo_url': 'https://truffle-assets.imgix.net/655ce202-862-butternutsquashcarbonara-land.jpg',
        'photos_array': [
            'https://ak3.picdn.net/shutterstock/videos/10431533/thumb/10.jpg',
            'https://www.kcet.org/sites/kl/files/styles/kl_image_large/public/thumbnails/image/square_hero_desktop_2x_sfs_spaghetti_carbonara_clr-3.jpg',
        ],
        'time': '15',
        'description': '-- Put the egg yolks into a bowl, finely grate in the Parmesan, season with pepper, then mix well with a fork and put to one side. Cut any hard skin off the pancetta and set aside, then chop the meat.',
        'ingredients': [[48, '50g'], [49, '100g'], [50, '350g'], [51, '2 plump'], [42, '50g'], [16, '3'], [1, '2 teaspoons'], [4, '2 teaspoons']],
    },
    {
        'category_id': 2, 'title': 'Lasagna',
        'photo_url': 'https://images8.alphacoders.com/817/817353.jpg',
        'photos_array': [
            'https://previews.123rf.com/images/somegirl/somegirl1509/somegirl150900048/46103208-top-view-of-a-delicious-traditional-italian-lasagna.jpg',
            'https://truffle-assets.imgix.net/87f324e4-YOUTUBE-NO-TXT.00_03_19_14.Imagen_fija001.jpg',
            'https://images4.alphacoders.com/817/817350.jpg',
        ],
        'time': '60',
        'description': '-- Cook noodles according to package directions; drain. Meanwhile, in a Dutch oven, cook sausage, beef and onion over medium heat 8-10 minutes or until meat is no longer pink.',
        'ingredients': [[36, '1 large'], [25, '1 pound'], [51, '5 cloves'], [52, '1 pound'], [53, '1 pound'], [54, '1 28 ounce can'], [23, '2 6 ounce can'], [55, '2 tablespoons'], [56, '1/4 cup'], [10, '1/2 cup'], [1, '1/2 teaspoons'], [58, '1 teaspoon'], [4, '1/4 teaspoons'], [16, '1 large'], [46, '1 pound'], [48, '1 cup'], [57, '30 ounces']],
    },
]


class Command(BaseCommand):
    help = 'Seed the database with InstaFood recipe data from the original React Native app'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # ── Ingredients ────────────────────────────────────────────────────────
        self.stdout.write('  Creating ingredients...')
        # Map from original JS index → DB Ingredient object
        ingredient_map = {}
        for ing in INGREDIENTS:
            obj, created = Ingredient.objects.get_or_create(
                name=ing['name'],
                defaults={'photo_url': ing['photo_url']},
            )
            ingredient_map[ing['id']] = obj
        self.stdout.write(self.style.SUCCESS(f'  - {len(ingredient_map)} ingredients'))

        # ── Categories ─────────────────────────────────────────────────────────
        self.stdout.write('  Creating categories...')
        category_map = {}
        for cat in CATEGORIES:
            obj, created = Category.objects.get_or_create(
                name=cat['name'],
                defaults={'photo_url': cat['photo_url']},
            )
            category_map[cat['id']] = obj
        self.stdout.write(self.style.SUCCESS(f'  - {len(category_map)} categories'))

        # ── Recipes ────────────────────────────────────────────────────────────
        self.stdout.write('  Creating recipes...')
        recipe_count = 0
        for recipe_data in RECIPES:
            category = category_map[recipe_data['category_id']]
            recipe, created = Recipe.objects.get_or_create(
                title=recipe_data['title'],
                category=category,
                defaults={
                    'photo_url': recipe_data['photo_url'],
                    'photos_array': recipe_data['photos_array'],
                    'time': recipe_data['time'],
                    'description': recipe_data['description'],
                },
            )
            # Create recipe-ingredient links
            for ing_id, quantity in recipe_data['ingredients']:
                ingredient = ingredient_map.get(ing_id)
                if ingredient:
                    RecipeIngredient.objects.get_or_create(
                        recipe=recipe,
                        ingredient=ingredient,
                        defaults={'quantity': quantity},
                    )
            recipe_count += 1

        self.stdout.write(self.style.SUCCESS(f'  - {recipe_count} recipes'))
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))


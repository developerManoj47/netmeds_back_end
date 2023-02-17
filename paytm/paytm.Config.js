const dotenv = require('dotenv');

dotenv.config()

module.exports =  {
    // merchent_id : "tmRoBh90182073607271",
    // website : "fAPNNg3!h3K60ZsM" ,
    // merchent_key : "WEBSTAGING"
    merchent_id : process.env.PAYTM_MERCHENT_ID,
    website : process.env.PAYTM_WEBSITE ,
    merchent_key : process.env.PAYTM_MERCHENT_KEY
}


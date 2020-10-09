<template>
    
    <div id="container">
        
        <div id="header" class="border-bottom pa-10">
            <div id="picSection">
                <img class="profilePicture" src="../assets/profile.png">
            </div>  
            <div id="greet" class="pt-3">
                <h1>Alfonso Mateos</h1>
                <h5>I'm from Cádiz, Spain <br>Currently based in <em>Eastbourne</em>, UK</h5>
            </div>
        </div>

        <div id="mainContent" class="container block pa-10">
            <v-container>
                <v-layout row wrap>
                    <v-flex md8 id="webIntro" class="px-5">
                        <h3 class="pb-2">Where am I?</h3>
                        <p>
                            You are visiting my latest work, which consists of a detection system using Bluetooth technology.  In the left panel you can navigate through the system's administration website. You can find the complete project in my Github (just on your right). Below I will be adding more sections little by little where I will talk about my studies, personal projects and goals.
                            <br><br>Cheers~
                        </p>
                    </v-flex>
                    <v-flex md4 id="contact" class="px-5">
                        <h3 class="pb-2">Contact</h3>
                        <v-layout row wrap class="my-row">
                            <v-flex md12 sm4 xs6>
                                <a href="https://www.linkedin.com/in/ajmateos">
                                <i class="fa fa-linkedin-square fa-2x valign-middle"></i>
                                <span class="px-2">Linkedin</span>
                            </a>
                            </v-flex>
                            <v-flex md12 sm4 xs6>
                                <a href="https://www.github.com/Sheppardd">
                                <i class="fa fa-github-square fa-2x valign-middle"></i>
                                <span class="px-2">Github</span>
                            </a>
                            </v-flex>
                            <v-flex md12 sm4 xs6>
                                <a @click="showPhone()">
                                <i class="fa fa-phone-square fa-2x valign-middle"></i>
                                <span class="px-2">Number</span>
                            </a>
                            </v-flex>
                            <v-flex md12 sm4 xs6>
                                <a @click="showEmail()">
                                <i class="fa fa-envelope-square fa-2x valign-middle"></i>
                                <span class="px-2">Email</span>
                            </a>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>

</template>

<script>

export default {
    
    name: 'Home',

    methods:
    {
        showEmail()
        {
            this.$alert("aj.mateos97@gmail.com");
        },

        showPhone()
        {
            this.$alert("+44 (0) 7424 342231");
        }
    }

}
</script>

<style scoped>

a
{
    text-decoration: none !important;
    color: black !important;
}

#contact a:active, #contact a:visited, #contact a:link
{
    color: black;
}

#contact a:hover
{
    color: #007199 !important;
}
#header
{
    background: rgb(234,243,251);
    background: linear-gradient(180deg, rgba(234,243,251,1) 0%, rgba(255,255,255,1) 50%, rgba(234,243,251,1) 100%);
}

.border-bottom
{
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0,0,0,.125);
}

#greet
{ 
    text-align: center;
}

.profilePicture
{
   border-radius: 50%;
   width: 8rem;
   display: block;
   margin: auto;
}

#mainContent
{
    max-width: 40em;
    margin-left: auto;
    margin-right: auto;
}

#webIntro
{
    text-align: justify;
    text-justify: inter-word;   
}

h3
{
    text-align: left;
}

.valign-middle 
{
    vertical-align: middle !important;
}

.my-row
{
    margin: 0 !important;
    padding: 0 !important;
}

#contact .col-md-12, .col-6
{
    margin: 0;
    padding: 0;
}

/* Fonts */
h1
{
    font-family: 'Open Sans', sans-serif;
    font-size: 48px;
    font-weight: 700;
}

h3
{
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
}

h5
{
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: 400;
    color: #AAAAAA;
}

p  
{
    font-family: 'Merriweather', serif;
    font-size: 16px;
    font-weight: 300;
    color: #2e2e2e;
}

h1, h3 
{
    color: #3a4145;
}


</style>
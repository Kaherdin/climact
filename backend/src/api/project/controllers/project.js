"use strict";

/**
 *  project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async updateMember() {
    // const data = [
    //   {
    //     title: "Prof.",
    //     name: "Julia",
    //     surname: "Steinberger",
    //     type: "Administration",
    //     job_title: "Academic co-director",
    //     roles: "Management, Steering committee, Executive committee",
    //     Role_fr: "Comité de pilotage, Comité exécutif",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "FGSE",
    //     email: "julia.steinberger@unil.ch",
    //     website_link:
    //       "https://www.unil.ch/gse/fr/home/menuinst/vie-facultaire/promotions--nominations/steinberger-julia.html",
    //     avatar:
    //       "https://www.unil.ch/files/live/sites/gse/files/profs_nv/steinberger.jpg",
    //     twitter: "JKSteinberger",
    //     linkedin: "https://www.linkedin.com/in/julia-steinberger-69139b1/",
    //     biography:
    //       "Julia Steinberger is Professor of Societal Challenges of Climate Change at the University of Lausanne. Her research examines the connections between resource use (energy and materials, greenhouse gas emissions) and societal performance (economic activity and human wellbeing).",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Michael",
    //     surname: "Lehning",
    //     Type: "Administration",
    //     job_title: "Academic co-director",
    //     roles: "Management, Steering committee, Executive committee",
    //     Role_fr: "Comité de pilotage, Comité exécutif",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "ENAC",
    //     email: "lehning@slf.ch",
    //     website_link: "https://people.epfl.ch/michael.lehning",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/167659.jpg?ts=1646410276",
    //     linkedin: "https://www.linkedin.com/in/michael-lehning-a3412965/",
    //     biography:
    //       "Michael (Michi) Lehning has been leading the CLIMACT development on the EPFL side and is a joint professor of cryospheric sciences and snow processes between EPFL and WSL (SLF Davos). He is an expert in snow-atmosphere interactions in extreme environments. More details can be found on the Laboratory of cryospheric sciences website or on Wikipedia.",
    //   },
    //   {
    //     title: "Dr",
    //     name: "Nicolas",
    //     surname: "Tetreault",
    //     Type: "Administration",
    //     job_title: "Executive director",
    //     roles: "Management, Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "CLIMACT",
    //     email: "nicolas.tetreault@climact.ch",
    //     avatar:
    //       "https://climact.ch/wp-content/uploads/2021/06/Website-Photo-Nicolas.jpg",
    //     twitter: "climactSuisse",
    //     linkedin: "https://www.linkedin.com/in/nicolastetreault/",
    //     biography:
    //       "After 15 years of academic research at University of Toronto, Cambridge University and EPFL, Dr. Nicolas Tetreault joined Sofies SA in 2015 as senior consultant to help public and private entities reach their climate goals. Expert in climate strategy and planification, as well as in renewable energy, H2, green chemistry and CCUS in particular, Nicolas is the executive director of CLIMACT since June 2021.",
    //   },
    //   {
    //     name: "Aïcha",
    //     surname: "Besser",
    //     Type: "Staff",
    //     job_title: "Communication specialist",
    //     roles: "Staff",
    //     Role_fr: "Employé",
    //     affiliation_uni: "CLIMACT",
    //     email: "aicha.besser@climact.ch",
    //     avatar:
    //       "https://climact.ch/wp-content/uploads/2021/09/Photo-Aicha-Besser-Profil.jpg",
    //     twitter: "climactSuisse",
    //     linkedin: "https://www.linkedin.com/in/aïcha-besser-28a13a7/",
    //   },
    //   {
    //     name: "Isabelle",
    //     surname: "Derivaz-rabii",
    //     Type: "Staff",
    //     job_title: "Administrative assistant",
    //     roles: "Staff",
    //     Role_fr: "Employé",
    //     affiliation_uni: "CLIMACT",
    //     email: "isabelle.derivaz-rabii@climact.ch",
    //     avatar:
    //       "https://climact.ch/wp-content/uploads/2021/06/Website-Photo-Isabelle-3.jpg",
    //     twitter: "climactSuisse",
    //     linkedin:
    //       "https://www.linkedin.com/in/isabelle-derivaz-rabii-71407a13b/",
    //   },
    //   {
    //     name: "Charmilie",
    //     surname: "Nault",
    //     Type: "Staff",
    //     job_title: "Project manager",
    //     roles: "Staff",
    //     Role_fr: "Employé",
    //     affiliation_uni: "CLIMACT",
    //     email: "charmilie.nault@climact.ch",
    //     avatar:
    //       "https://climact.ch/wp-content/uploads/2021/06/Website-Photo-Charmilie-3.jpg",
    //     twitter: "climactSuisse",
    //     linkedin: "https://www.linkedin.com/in/charmilie-nault-12a108a7/",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Claudia",
    //     surname: "Binder",
    //     Type: "Researcher",
    //     job_title: "Dean",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "ENAC",
    //     email: "claudia.binder@epfl.ch",
    //     website_link: "https://people.epfl.ch/claudia.binder?lang=en",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/265222.jpg?ts=1646411434",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Estelle",
    //     surname: "Doudet",
    //     Type: "Researcher",
    //     job_title: "Vice-rector research",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "FRA",
    //     email: "estelle.doudet@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=1204963&LanCode=8",
    //     avatar:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/photo/1204963.jpg",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Anna",
    //     surname: "Fontcuberta i Morral",
    //     Type: "Researcher",
    //     job_title: "Associate Vice President for Centers and Platforms",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "STI",
    //     email: "anna.fontcuberta-morral@epfl.ch",
    //     website_link: "https://people.epfl.ch/anna.fontcuberta-morral",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/182447.jpg?ts=1646411982",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Frédéric",
    //     surname: "Herman",
    //     Type: "Researcher",
    //     job_title: "Dean",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "FGSE",
    //     email: "Frederic.Herman@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=1139405",
    //     avatar:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/photo/1139405.jpg",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Niklas",
    //     surname: "Linde",
    //     Type: "Researcher",
    //     job_title: "Dean",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "FGSE",
    //     email: "niklas.linde@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=1070982&LanCode=8",
    //     avatar:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/photo/1070982.jpg",
    //   },
    //   {
    //     title: "Dr",
    //     name: "Nelly",
    //     surname: "Niwa",
    //     job_title: "Director",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "CCD",
    //     email: "nelly.niwa@unil.ch",
    //     website_link:
    //       "https://www.unil.ch/centre-durabilite/fr/home/menuinst/presentation/equipe.html",
    //     avatar:
    //       "https://www.unil.ch/files/live/sites/centre-durabilite/files/images/COM-FOT-13073-p.jpg?t=w580",
    //     biography:
    //       "Nelly Niwa est Architecte-Urbaniste EPFL, docteure en environnement de l’UNIL et directrice du Centre de compétences en durabilité. Elle a travaillé comme urbaniste à la CEAT et s’est spécialisée dans la planification locale et les processus participatifs. Elle a dirigé le projet Vaud 2030 sur la question du futur de l’agriculture (vaud2030.ch ), ainsi que le programme de recherche-collaborative Volteface sur les aspects sociétaux de la transition énergétique (volteface.ch ). Dans le cadre du Centre de Durabilité, elle accompagne des recherches interdisplinaires sur la durabilité, des recherches collaboratives et supervise la réalisation d’études pour des institutions publiques.",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Mario",
    //     surname: "Paolone",
    //     Type: "Researcher",
    //     job_title: "Academic director",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "STI",
    //     email: "mario.paolone@epfl.ch",
    //     website_link: "https://people.epfl.ch/mario.paolone",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/156731.jpg?ts=1646412790",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Martin",
    //     surname: "Vetterli",
    //     Type: "Researcher",
    //     job_title: "President",
    //     roles: "Steering committee",
    //     Role_fr: "Comité de pilotage",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "IC",
    //     email: "martin.vetterli@epfl.ch",
    //     website_link: "https://people.epfl.ch/martin.vetterli",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/107537.jpg?ts=1646414949",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Rizlan",
    //     surname: "Bernier-Latmani",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "ENAC",
    //     email: "rizlan.bernier-latmani@epfl.ch",
    //     website_link: "https://people.epfl.ch/rizlan.bernier-latmani",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/171550.jpg?ts=1646415345",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Fabrizio",
    //     surname: "Butera",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "FSSP",
    //     email: "fabrizio.butera@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=28138&LanCode=8",
    //     avatar:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/photo/28138.jpg",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Daniela",
    //     surname: "Domeisen",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "FGSE",
    //     email: "Daniela.Domeisen@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=1230856&LanCode=8",
    //     avatar:
    //       "https://www.unil.ch/files/live/sites/gse/files/profs_nv/domeisen.jpg",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Corentin",
    //     surname: "Fivet",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "ENAC",
    //     email: "corentin.fivet@epfl.ch",
    //     website_link: "https://people.epfl.ch/corentin.fivet",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/265224.jpg?ts=1646415774",
    //   },
    //   {
    //     title: "Dr.",
    //     name: "Augustin",
    //     surname: "Fragnière",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "CCD",
    //     email: "augustin.fragniere@unil.ch",
    //     website_link:
    //       "https://www.unil.ch/centre-durabilite/fr/home/menuinst/presentation/equipe.html",
    //     avatar:
    //       "https://www.unil.ch/files/live/sites/centre-durabilite/files/images/Screenshot%202022-02-08%20at%2017.44.18.png?t=w580",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Samuel",
    //     surname: "Jaccard",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "UNIL",
    //     email: "Samuel.Jaccard@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=19338&LanCode=8",
    //     avatar:
    //       "https://www.unil.ch/files/live/sites/gse/files/profs_nv/jaccard.jpg",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "François",
    //     surname: "Maréchal",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "STI",
    //     email: "francois.marechal@epfl.ch",
    //     website_link: "https://people.epfl.ch/francois.marechal",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/140973.jpg?ts=1646416014",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Athansios",
    //     surname: "Nenes",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "ENAC",
    //     email: "athanasios.nenes@epfl.ch",
    //     website_link: "https://people.epfl.ch/athanasios.nenes",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/296807.jpg?ts=1646416070",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Nicolas",
    //     surname: "Senn",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "UNIL",
    //     affiliation_fac: "UNISANTE",
    //     email: "Nicolas.Senn@unil.ch",
    //     website_link:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=912378&LanCode=8",
    //     avatar:
    //       "https://applicationspub.unil.ch/interpub/noauth/php/Un/photo/912378.jpg",
    //   },
    //   {
    //     title: "Prof.",
    //     name: "Marie",
    //     surname: "Violay",
    //     Type: "Researcher",
    //     roles: "Executive committe",
    //     Role_fr: "Comité exécutif",
    //     affiliation_uni: "EPFL",
    //     affiliation_fac: "ENAC",
    //     email: "marie.violay@epfl.ch",
    //     website_link: "https://people.epfl.ch/marie.violay",
    //     avatar:
    //       "https://people.epfl.ch/private/common/photos/links/258084.jpg?ts=1646416205",
    //   },
    // ];

    // data.forEach((element) => {
    //   const {
    //     title,
    //     job_title,
    //     name,
    //     surname,
    //     type,
    //     roles,
    //     affiliation_uni,
    //     affiliation_fac,
    //     email,
    //     website_link,
    //     twitter,
    //     biography,
    //     linkedin,
    //     // avatar,
    //   } = element;

    //   console.log(element, "element");

    //   strapi.service("api::member.member").create({
    //     data: {
    //       title: title,
    //       job_title: job_title,
    //       name: name,
    //       surname: surname,
    //       type: type,
    //       roles: roles,
    //       affiliation_uni: affiliation_uni,
    //       affiliation_fac: affiliation_fac,
    //       email: email,
    //       twitter: twitter,
    //       linkedin: linkedin,
    //       biography: biography,
    //       website_link: website_link,
    //       //   avatar: avatar,
    //     },
    //   });
    // });
    return "Off";
  },
  async actNow(ctx) {
    const {
      firstName,
      lastName,
      email,
      subject,
      message,
      projectTitle,
      emailLeader,
    } = ctx.request.body;

    const emailTemplate = {
      subject: subject,
      text: `${projectTitle}${firstName} ${lastName} (${email}).\n\n${message}`,
      html: `<h1>${projectTitle}${firstName} ${lastName} (${email}).</h1>
            <h3>${subject}</h3>
            <p>${message}<p>`,
    };

    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: emailLeader,
        replyTo: email,
      },
      emailTemplate
    );
    return "ok";
  },
}));

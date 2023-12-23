import axios from 'axios';

export default {
  config: {
    name: "genimage",
    aliases: ["sdi"],
    credits: "Samir Œ",
    version: "1.0",
    cooldown: 10,
    description: "Generates an image from a text description",
    usage: "[prompt] | [model]",
  },

  onCall: async function({ message, args, prefix }) {

    const info = args.join(" ");
    if (!info) {
      return message.reply(`Invalid usage! Proper usage: ${prefix}genimage [prompt] | [model]\n\nSupported models:
│1 | 3Guofeng3_v34
│2 | absolutereality_V16
│3 | absolutereality_v181
│4 | amIReal_V41
│5 | analog-diffusion-1.0
│6 | anythingv3
│7 | anything-v4.5
│8 | anythingV5
│9 | AOM3A3_orangemixs
│10 | blazing_drive_v10
│11 | cetusMix_V35
│12 | childrensStories_v13
│13 | childrensStories_v1SemiReal
│14 | childrensStories_v1ToonAnime
│15 | Counterfeit_v30
│16 |cuteyukimixAdorable_mid
│17 | cyberrealistic_v33
│18 | dalcefo_v4
│19 | deliberate_v2
│20 | deliberate_v3
│21 | dreamlike-anime-1.0
│22 | dreamlike-diffusion-1.0
│23 | dreamlike-photoreal-2.0
│24 | dreamshaper_6
│25 | dreamshaper_7
│26 | dreamshaper_8
│27 | edgeOfRealism_eorV20
│28 | EimisAnimeDiffusion_V1
│29 | elldreths-vivid-mix
│30 | epicrealism_naturalSinRC1VAE
│31 | ICantBelieveItsNot
│32 | juggernaut_aftermath
│33 | lofi_v4
│34 | lyriel_v16
│35 | majicmixRealistic_v4
│36 | mechamix_v10
│37 | meinamix_meinaV9
│38 | meinamix_meinaV11
│39 | neverendingDream_v122
│40 | openjourney_V4
│41 | pastelMixStylizedAnim
│42 | portraitplus_V1.0
│43 | protogenx34
│44 | Realistic_Vision_V1.4
│45 | Realistic_Vision_V2.0
│46 | Realistic_Vision_V4.0
│47 | Realistic_Vision_V5.0
│48 | redshift_diffusion-V10
│49 | revAnimated_v122
│50 | rundiffusionFX25D_v10
│51 | rundiffusionFX_v10
│52 | sdv1_4
│53 | v1-5-pruned-emaonly
│54 | shoninsBeautiful_v10
│55 | theallys-mix-ii-churned
│56 | timeless-1.0
│57 | toonyou_beta6
╰──────⭔\n\n Example: ${prefix}genimage Dog | 5`);
    } else {
      const msg = info.split("|");
      const text = msg[0];
      const model = msg[1] || '19';

      try {
        let msgSend = await message.reply("⏳ | Generating image, please wait...");
        const { data } = await axios.get(
          `http://samir.architectdevs.repl.co/generate?prompt=${text}&model=${model}`
        );

        const imageUrls = data.imageUrls[0];

        global.api.unsendMessage(msgSend.messageID);
        if (imageUrls) {
          message.reply({
            body: `🖼️ | Here's your generated image:`,
            attachment: await global.getStream(imageUrls)
          });
        } else {
          throw new Error("Failed to fetch the generated image");
        }
      } catch (err) {
        console.error(err);
        return message.reply("An error occurred, please try again later");
      }
    }
  }
};
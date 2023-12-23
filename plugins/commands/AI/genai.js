import fs from 'fs';
import axios from 'axios';

const models = [
  "46846", "232703", "180845", "106922", "64094", "209164", "176425", "93208", "128713", "181914", "179446", "100675", "143906", "119057", "5038", "156263", "75209", "218017", "121557", "89855", "108289", "234105", "86698", "132760", "198401", "115942", "130121", "95489", "224009", "224200", "223670", "130072", "182252", "141866", "160495", "127207", "127416", "112809", "108545", "127680", "90854", "220703", "90599", "181248", "6087", "229575", "166916", "158294", "223684", "142125", "147184", "204878", "189192", "25993", "181191", "124626", "137204", "113391", "6878", "5036", "167841", "224080", "105796", "24129", "137207", "69687", "70977", "158155", "115086", "120036", "101966", "159473", "180919", "114492", "234205", "153135", "84783", "103277", "6792", "89927", "90674", "112825", "208500", "215628", "147336", "229535", "12763", "138124", "232266", "125903", "161429", "110299", "17084", "205925", "220987", "23323", "233820", "53806", "2810071", "45669", "29179", "128046", "5021", "45601", "179525", "23326", "67192", "71733", "14459", "75", "90587", "123908", "207802", "232446", "224916", "139087", "107812", "142506", "43825"];
const ratios = ['0', '1', '2']

export const config = {
  name: 'genai',
  version: '1.0.0',
  credits: 'JARiF | Akash Xzh', //dont change author or remove ... otherwise i will turn off the API
  description: 'Text to Image',
  cooldown: 10,
  usage: 'type {pn} with prompts | model_number | ratio'
};

export async function onCall({ prefix, message, args }) {
  const text = args.join(" ");
  if (!text) {
    return message.reply(`Please provide a prompt, model number and ratio.\n\nAvailable Models: \n\n1. ReV Animated v1.2.2-EOL\n2. Babes Babes 3.0\n3. Aniverse V1.5 - Pruned\n4. Hassaku(hentai model) v1.3\n5. NeverEnding Dream(NED) v1.22 baked vae\n6. Indigo Furry mix v90_hybrid\n7. majicMIX realistic 麦橘写实 v7\n8. Dark Sushi Mix 大颗寿司Mix 2.25D\n9. DreamShaper 8\n10. BB95 Furry Mix v12.0\n11. Perfect World 完美世界 v6(Baked)\n12. MeinaHentai V4\n13. epiCRealism Natural Sin RC1 VAE\n14. MeinaMix Meina V11\n15. AbyssOrangeMix2 - Hardcore AbyssOrangeMix2_hard\n16. Ether Real Mix Ether Real Mix 3.1\n17. majicMIX sombre 麦橘唯美 v2.0\n18. RealCartoon3D v10\n19. ICBINP - "I Can't Believe It's Not Photography" SECO\n20. majicMIX lux 麦橘奇幻 v2\n21. MeinaPastel V6(Pastel)\n22. majicMIX fantasy 麦橘幻想 v3.0\n23. PerfectDeliberate v4.0\n24. AbsoluteReality v1.8.1\n25. CyberRealistic v4.0\n26. Realisian v5.0\n27. DarkSun v4.1\n28. AnyLoRA - Checkpoint bakedVae(blessed) fp16 NOT - PRUNED\n29. RealCartoon - Realistic V10\n30. RealCartoon - Pixar V5\n31. epiCPhotoGasm Last Unicorn\n32. Realistic Vision V5.1 V5.1(VAE)\n33. Checkpoint YesMix v3.5\n34. Dark Sushi 2.5D 大颗寿司2.5D v4.0\n35. Analog Madness - Realistic model v6.0\n36. Juggernaut Aftermath\n37. SXZ Luma 0.9X VAE\n38. MeinaUnreal V4.1\n39. Mistoon_Anime v2.0\n40. Lucky Strike Mix 可爱女人Lovely Lady V1.05\n41. 万象熔炉 | Anything V5 / Ink ink\n42. Sardonyx REDUX v3.0\n43. Colorful v3.1\n44. Virile Reality V3.0 BETA 3\n45. Kotosmix V1.0\n46. AingDiffusion v12\n47. Arthemy Comics v5.0\n48. Sweet - mix v2.2 - flat\n49. Animesh Animesh - Full V2.2\n50. Clarity Clarity 3\n51. Meichidark_Mix MeichiDark_V4.5\n52. Flat - 2D Animerge v4.0\n53. YiffyMix v35\n54. FaceBombMix v1_bakedVAE\n55. Animerge V2.4\n56. RPG v5\n57. Experience Experience v10\n58. richyrichMix richyrichMix - v2.fp16\n59. Corneo's 7th Heaven Mix v2\n60. AbyssOrangeMix2 - NSFW AbyssOrangeMix2_nsfw\n61. Blazing Drive _V10g\n62. RealCartoon - Anime V7\n63. FaeTastic FaeTastic Version 2\n64. Comic Babes v1\n65. Consistent Factor(Euclid) Euclid(v6.1)\n66. majicMIX reverie 麦橘梦幻 v1.0\n67. Cartunafied v3\n68. Art Universe v8.0\n69. LazyMix + (Real Amateur Nudes) v3.0b\n70. PerfectDeliberate - Anime v1.0\n71. CarDos Animated v3.0\n72. FluffyRock e184 - vpred - e157\n73. RaemuMix v6.0\n74. Ether Blu Mix Ether Blu Mix 5\n75. JAM(just another merge) v2.0_bakedvae_pruned\n76. PicX 1.0\n77. iCoMix iCoMix V05\n78. fCAnimeMix - fC: 动漫(Anime) v3.0\n79. Kenshi 01\n80. AAM - AnyLoRA Anime Mix - Anime Screencap Style Model v1\n81. Koji v2.1\n82. MeinaAlter V3\n83. Matrix - Hentai - Plus v3.0\n84. BeautyFool v3.0\n85. HARD HARDER\n86. Virile Fusion v3.0 BETA 1\n87. The Ally's Mix III: Revolutions V1.0\n88. CalicoMix v7.5\n89. Hardcore - Hentai v1.2[baked VAE]\n90. seizaMix v2\n91. CamelliaMIx_2.5D V3\n92. Goofball Mix v2 - baked\n93. KoreanStyle2.5D KoreanStyle2.5D Baked VAE fp16\n94. Beautiful Art v7.0\n95. The Truality Engine The Truality Engine V3\n96. Galena Blend v1.2\n97. KayWaii v7.0\n98. majicMIX horror 麦橘恐怖 v1\n99. Anime Pastel Dream Soft - baked vae\n100. CyberRealistic Classic Classic V2.0\n101. TheAlly's Mix IV: Verisimilar v1.0\n102. Grapefruit(hentai model) grapefruitV4.1\n103. 3D Animation Diffusion v1.0\n104. AbyssOrangeMix2 - SFW / Soft NSFW AbyssOrangeMix2_sfw\n105. Aurora v1.0\n106. Rabbit v7\n107. Sardonyx Blend v1.2\n108. rMadArt(SD1.5) v10.0(test)\n109. Pika's New Generation v2.0\n110. Night Sky YOZORA Style Model YoZoRa - V1 - origin\n111. Anything V3 fp16\n112. Dreamscapes & Dragonfire - NEW! - V2.0! - (SEMI - REALISM FANTASY MODEL) DS & Dv2.0\n113. architecture_Exterior_SDlife_v4.0\n114. NeatNess Fluffy Fur Mix Zephyr\n115. RaesanMix v4.1\n116. endlessReality v5\n117. OnlyRealistic | 《唯》· 超高清真人写实 v30 Baked VAE\n118. blue_pencil v10\n119. Kawaii Realistic European Mix v0.4\n120. CarDos Anime v2.0\n\nFor Example: ${prefix}${config.name} Dog | 3 | 1`);
  }

  let prompt, ss, r;

  if (text.includes("|")) {
    const [promptText, modelInput, ratioInput] = text.split("|").map((str) => str.trim());
    prompt = promptText;

    if (!isNaN(modelInput) && !isNaN(ratioInput)) {
      const modelNumber = parseInt(modelInput);
      const ratioNumber = parseInt(ratioInput);

      if (modelNumber >= 1 && modelNumber <= models.length) {
        ss = models[modelNumber - 1];
      } else {
        return message.reply("Invalid model number. Please use a valid number from the guide.");
      }

      if (ratioNumber >= 0 && ratioNumber < ratios.length) {
        r = ratios[ratioNumber];
      } else {
        return message.reply("Invalid ratio number. Please use a valid ratio number from the available options.");
      }
    } else {
      return message.reply("Invalid input for model or ratio. Please use valid numbers for model and ratio.");
    }
  } else {
    prompt = text;
    ss = "46846";
    r = "2";
  }
  const waitingMessage = await message.reply("⏳ | Processing your image...");
  try {

    const x = `https://project-imagine.onrender.com/imagine?prompt=${encodeURIComponent(prompt)}&model=${ss}&ratio=${r}`;

    const timeout = 20000;
    const imageStreamPromise = a.get(x.data.image, { responseType: 'arraybuffer' });

    try {
      const imageStream = await Promise.race([
        imageStreamPromise,
        new Promise((_, reject) =>
          setTimeout(() => {
            global.api.unsendMessage(waitingMessage.messageID);
            reject(new Error('API request timeout.'));
          }, timeout)
        ),
      ]);

      if (imageStream) {
        const path = path.join(global.cachePath, `${message.threadID}_genaiimage_${Date.now()}.png`);
        fs.writeFileSync(path, Buffer.from(imageStream.data, 'utf-8'));
        message.reply({
          attachment: fs.createReadStream(path),
        },
          () => {
            fs.unlinkSync(path);
            global.api.unsendMessage(waitingMessage.messageID);
          }
        );
      } else {

        message.reply("Error...");
      }
    } catch (error) {
      console.error(error);
      message.reply("Error...");
    }
  } catch (error) {
    console.error(error);
    message.reply("Error...");
  }
};
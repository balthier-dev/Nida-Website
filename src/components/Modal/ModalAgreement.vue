<template>
  <modal
    name="modal-agree"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    :height="600"
    :width="600"
    :adaptive="true"
    @closed=" $emit('setAgree', agree)"
  >
    <div class="bg-ecio-bg p-5">
      <div class="row">
        <div class="col-6 col-lg-4 mx-auto">
          <img src="@/assets/images/Picture1.png" alt="modal logo" />
         
        </div>
        <div class="col-12 mb-3">
           <h1 class=" mt-3 text-center text-uppercase text-custom-green text-3xl">
                Terms of Use
              </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-3">
          <div class="box-agree text-white">
                <p>
                These following Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“<b>you</b>", or each a “<b>User</b>” and collectively the “<b>Users</b>”) and ECIO space (“<b>we</b>", “<b>us</b>", “<b>our</b>" or “<b>ECIO</b>”) regarding your access to and use of the ecio.space website as well as any social media channels, social networks, communities or mobile applications related, linked, or otherwise connected thereto (collectively, the “<b>Site</b>"). ECIO is a web application and game application that runs on the Binance Smart Chain (the "<b>Blockchain</b>"), using a specially-developed system called Smart Contract (the “<b>Smart Contract</b>”) to enable Users to battle as well as own and trade digital assets with different rarities. The Smart Contract and the Site are collectively referred to in these Terms as the “<b>App</b>”. By using the App, Users can manage their assets and use the Smart Contract to battle and trade with other Users.
WE ARE ONLY WILLING TO LICENCE THE USE OF THE APP TO YOU IF YOU ACCEPT ALL OF THESE TERMS. BY USING THE APP OR ANY RELATED ASSET, OR BY CLICKING “I ACCEPT” BELOW AND IMPLYING YOUR ACCEPTANCE CHECKING IN THE TICK BOX, YOU ARE CONFIRMING THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY ALL OF THESE TERMS OF USE. IF YOU DO NOT AGREE AND/OR ACCEPT ALL OF THESE TERMS OF USE, THEN YOU ARE NOT ELIGIBLE TO USE THE APP AND YOU MUST STOP ANY FORM OF USE OF OUR ASSETS IMMEDIATELY.
                </p>
                <p>
                  Supplemental terms and conditions or any type of additional documents that may be publicized on the App at some points in the future will be eventually integrated with the existing terms of use. We reserve our rights in our sole discretion to make any type of changes or modifications to these Terms of Use at any time and for any reason. You will be notified of any changes upon entering the App after the new Terms of Use are updated on the App, and in such cases you shall be only be able to access the App if you agree to the updated Terms of Use. However, it is not legally compulsory for us to notify and release changelogs pointing out such changes specifically. It is your responsibility to periodically review these Terms of Use to stay fully informed of updates. You will be subjected to and deemed as being aware and accepted the changes in any revised Terms of Use by proceeding to use of the App after such revised terms come into effect on a publicized date.

                </p>
                <p>
                 Information on the App are not intended for distributing to or being used by any single person or entity in any jurisdiction or country where such distribution or use would be against its existing laws or regulations as well as any circumstance would subject us to any registration requirements within the territories of said jurisdiction or country. Users who make their decisions to access the App from outside from our base country are deemed to have the understanding of doing so on their own choices and therefore are legally eligible for compliance with local laws, assuming they are applicable to them to some extent.

                </p>
                <p>
                  Our product is intended for users who are at least 18 years old. People under the age of 18 are not permitted to any own and/or use our assets including the App. 
                </p>
                <h3>1.INTELLECTUAL PROPERTY RIGHTS</h3>
                <p>
                  Apart from other noted indications, the App collectively is proprietary to us, including all source codes, databases, functionalities, softwares, website designs, audios, videos, texts, photographs, and graphics on the App (collectively, the “<b>Content</b>"). Trademarks, service marks, and logos (the “<b>Marks</b>") are owned and legally licensed to us, controlled by us, and are protected either by registration or by copyright. Apart from uses stated and provided in these Terms of Use, no part of the App and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purposes whatsoever, without our prior approval.
                </p>
                <p>
                  Provided that you are eligible to use the App, you are granted limited access to and use of the Site to download or print a copy of any portion of the Content for personal, non-commercial uses.
                </p>
                <p>
                  Provided that you own, or get permission and/or a licence from someone who owns ECIO tokens or NFTs, you are granted a limited license to create fan-art which can be used non-commercially given that you follow the terms set herein:
                  <ul>
                    <li>Fan artwork must not use official ECIO assets (the ECIO logo etc), but creating derivative non-commercial official ECIO-assets as inspiration is acceptable.</li>
<li>The artwork must clearly state “ECIO Fanart”, link to  <a href="https://ecio.space">https://ecio.space</a>, and link directly to the token and/or NFT that is being used for inspiration.</li>
<li>For commercial usage, an official license agreement has to be executed. The revenue can come from either fanart (tokenized or physical) or merchandise (t-shirts, mugs, hoodies, figures etc).</li>
                  </ul>
                </p>
                <p>
                  Creating original fanart without monetizing it is acceptable without any formal license or ownership.
                </p>
                <h3>2.USER REPRESENTATIONS</h3>
                <p>By using the App, you represent yourself and agree that:</p>
                <p>(a)	All registration information you submit is fully stated, true, accurate, and up-to-date;</p>
                <p>(b)	You will maintain the accuracy of such given information and will be asked promptly to make updates whenever necessary;</p>
                <p>(c)	You have the legal capacity and the thorough understanding of complying with these Terms of Use;</p>
                <p>(d)	You are not a part of a minority community that practices laws and regulations which have nothing in common with ours;</p>
                <p>(e)	You will not access the App using automated and non-human means, whether it is a bot, script, or anything alike;</p>
                <p>(f)	You will not use the App for illegal and unauthorized purpose;</p>
                <p>(g)	Your use of the App will not violate any existing law or regulation in any jurisdiction. If you provide any information that is untruthful, inaccurate, not up-to-date, we have the right to suspend or terminate your accounts and refuse to approve your any action regarding any current or future activities of the App.</p>
                <p>(h)	You can only own one account attaching to one device at a time;</p>
                <p>(i)	You are not on any blacklist of any organization for any reason including but not limited to committing scams, fraud; illegal data exploiting, using third-party software for personal benefits; trying to gain access and damage our assets without our approval; and everything alike. If we find out that you are committing any illegal activities on or through the App, we will make prompt intervention and resort to legal means if necessary.</p>
                <h3>3. USER REGISTRATION</h3>
                <p>You are required to register for an account upon accessing the App. We reserve the right to remove, reclaim or change a username you select if we determine in our sole discretion that such username is inappropriate, offensive, or contrary to law and/or public policy.</p>
                <p>Each User shall only register for one account and the creation of multiple accounts on the App is prohibited. If you are found to have more than one account, we shall have the right to disable, delete, or suspend any of your accounts.</p>
                <p>You shall keep your password and other account credentials confidential and you shall be solely responsible for the use of your account and password. If you have any reason to believe that your account information has been compromised or if there has been any unauthorised and/or suspicious activities on your account, please notify us immediately. </p>
                <p>By submitting your information to us, you hereby consent to our collection, use, disclosure and storage of your personal data in accordance with our privacy policy found at <a target="_blank" href="/privacy-policy">https://ecio.space/privacy-policy</a>.</p>
                <h3>4. WALLETS AND DIGITAL ASSETS</h3>
                <p>ECIO allows its users to access and manage BEP20 digital blockchain-based assets (“<b>Digital Assets</b>”). Your wallet, Digital Assets, and cryptocurrencies are completely within your own control. By using your wallet, you shall be fully responsible for the maintenance and security of your wallet and account, as well as for all activities and actions taken from and/or by your account and wallet. You shall be the only one responsible for manipulating your fund to perform any transfers of Digital Assets. We cannot interfere with any of your Digital Assets storage and transactions from your wallets in any case.</p>
                <p>ECIO does not maintain any blockchain wallets. You hereby acknowledge and agree that ECIO has no liability for or control over the safety, suitability, quality, delivery, legality, or other aspects of any of your Digital Assets.</p>
                <p>Any financial transactions conducted on the App shall be conducted solely through the supported blockchain network, which is not within our control. We will not have the ability to cancel or reverse any transaction, and you shall hold us harmless in relation to any claims or damages that may arise from any transactions on the App through the blockchain network.</p>
<h3>5. PROHIBITED ACTIVITIES</h3>
<p>You may not access or use the App for any purpose other than those for which we make the App available. The App may not be used in connection with any commercial activities if not approved by our legal teams in  ECIO space.</p>
<p>In particular, you shall not:</p>
<p>(a)	Systematically retrieve data or other content from the App to create or compile, directly or indirectly, a collection, compilation, database, or directory without our approval.</p>
<p>(b)	Conduct any unauthorized use of the App, including collecting usernames and/or email addresses of registered users by using third-party software; creating user accounts by automated means including using bots or hiding presences by faking IP addresses.</p>
<p>(c)	Use a buying agent or purchasing agent to make purchases on the App.</p>
<p>(d)	Use the App as assets to advertise and offer to sell personal goods and services not relating to ECIO space.</p>
<p>(e)	Circumvent, disable, or otherwise interfere with security-related features of the App, including those that prevent or restrict the act of copying Content or enforcing limitations on the use of the App.</p>
<p>(f)	Trick, defraud, or mislead us and other users with any attempt to get sensitive account information such as user passwords.</p>
<p>(g)	Make improper use of our support services or submitting false reports.</p>
<p>(h)	Commit acts of using automated means or AI to interfere with our assets, such as using scripts to send comments or messages, or using any data mining tools, robots, data extraction tools, and alike.</p>
<p>(i)	Interfere with or creating interruption on the App, the networks or services related to the product.</p>
<p>(j)	Attempt to impersonate another user or person; using the username of another user.</p>
<p>(k)	Sell or transfer your game account.</p>
<p>(l)	Use any information obtained from the App in order to harass, abuse, or harm any individuals and/or corporations</p>
<p>(m)	Use the App as a part of an effort to compete with us.</p>
<p>(n)	Use the App or every product-related matters for commercial purposes.</p>
<p>(o)	Decipher, decompile, disassemble, or interfere mechanically any of the software parts or assets of the App.</p>
<p>(p)	Attempt to bypass any measures designed to prevent or restrict access to App.</p>
<p>(q)	Harass, intimidate, or threaten our employees or agents whose jobs are to provide any portion of the App to you directly.</p>
<p>(r)	Delete logos or marks representing the copyright or other proprietary rights from our product.</p>
<p>(s)	Copy and make use of the App’s frontend codes, including but not limited to Flash, PHP, HTML, JavaScript, and others.</p>
<p>(t)	Upload or transmit viruses, Trojan horses, or anything alike, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interfere with our product’s intentional original works. </p>
<p>(u)	Modify, impair, disrupt, alter, or interfere with the intentional original uses, features, functions, operations, or acts of maintenance of the App.</p>
<p>(v)	All types of activities, all forms of action which violates any law and/or regulation in any jurisdiction.</p>
<h3>6. FEE AND PAYMENT
</h3>
<p>You can purchase and trade Space Warriors NFTs, Genomic Fragment NFTs, Blueprint Fragment NFTs, Mystery Box NFTs (collectively, “<b>NFTs</b>"). The number of Warriors generated is 41 million coming with distinctively different gameplays, movesets, special skills and storylines. The marketplace allows players to make transactions with others, please note that such transactions are conducted solely through the Blockchain via a designated wallet and currency ($BUSD). We will keep no information and provide no control, support, and the ability to reverse reported transactions. In general, we have no liability to you or to any third party for any alleged problems that arise during the alleged trades and transactions conducted via the Smart Contract, the Blockchain.
</p>
<p>The Blockchain requires the payment of a transaction fee for every transaction that occurs in the marketplace. The fee funds the network of computers that run the decentralized network.</p>
<p>In addition to the fee, each time you use the Smart Contract to conduct a transaction with another user via the App, you consent to allowing to collect a commission of 4.25% of the total value of that transaction. You should have a clear understanding that the commission will be transferred directly to us through the Blockchain as a part of the transaction.
</p>
<p>Each party will be legally responsible for paying any types of costs, duty, and tax applicable to them. Such numbers will vary according to your jurisdictions and countries as well as the national laws and regulations. It shall not be our responsibility to provide any assistance or support in relation to any costs, duty, and tax applicable to you.</p>
<h3>7. SUBMISSION
</h3>
<p>You should have a full understanding and an agreement that any question, comment, suggestion, idea, feedback or other forms of information regarding using the App (“<b>Submissions</b>") provided by you to us are non-confidential and shall eventually become our property. We are eligible for the unrestricted use of these Submissions to any lawful purposes, commercial activities without notifying you of our acknowledgment or compensation. We shall have the sole discretion to review and vet any Submission. Everything that poses a violation against the laws and regulations will be completely removed without notification.
</p><h3>8. THIRD-PARTY WEBSITE AND CONTENT</h3>
<p>Third-Party Websites are other websites aside from the App. Third-party content are articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties.</p>

<p>We are not responsible for any Third-Party Websites accessed through the App, or any Third-Party Content posted on, available through, or installed from the App. We shall not be held responsible for any of the following: content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Contents.
If you decide to leave the App and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk and you should be aware that our Terms of Use are no longer applicable to the Third-Party Websites and/or Third-Party Content. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the App or relating to any applications you use or install from the App.
</p>

<p>If you decide to leave the Site and/or the App and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk and you should be aware that these Terms of Use you are reading are no longer effective. At this point, the Terms of Use of the Third-Party Websites you are using are effective. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site and/or the App or relating to any applications you use or install from the Site and/or the App.
</p>
<p>Any purchase you make through Third-Party Websites is no longer covered by our Terms of Use, so we are not responsible for any problem that arises from the transaction. You agree and acknowledge that we do not endorse the products and services offered on Third-Party Websites and you should hold us harmless from any harm caused by your purchase of such products and services.
</p>
<p>Additionally, any losses sustained by you or harm caused to you relating to resulting in any way from any Third-Party Content or any contact with Third-Party Websites shall not be our responsibility.
</p>
<h3>9. ADVERTISING</h3>
<p>We provide areas within the Site and the App for advertisements and other information. Advertisers are fully responsible for the reliability of the advertisements, including the services and products. These advertisements should not violate any rules, and advertisers must prove that they have the following rights, but are not limited to, intellectual property rights, publicity rights, and contractual rights. We hold no responsibility if there are any violations regarding these rights.
</p>
<h3>10. TERMINATION</h3>
<p>These Terms of Use remain in full force and effect while you use the App. We reserve the right and to conduct the following actions at our sole discretion and without informing you: deny access to and use of the App (including blocking IP Addresses) to any person for breach of any representation, warranty, or covenant contained in these Terms of Use. We may terminate your use or participation in the App or delete your account without warning, at our sole discretion.</p>
<p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or a borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating and suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>

<h3>11. DISCLAIMERS
</h3>
<p>You expressly understand and agree that your access to and use of the App are at your sole risk and that the App are provided "as is" and "as available" without warranties of any kind, whether express or implied. To the fullest extent permissible pursuant to applicable law, we, our subsidiaries, affiliates, and licensors make no express warranties and hereby disclaim all implied warranties regarding the App and any part of it (including, but not limited to, the website, any smart contract, or any external websites), including the implied warranties of merchantability, fitness for a particular purpose, non-infringement, correctness, accuracy, or reliability.</p>

<p>
  Without limiting the generality of the foregoing, we, our subsidiaries, affiliates, and licensors do not represent or warrant to you that:
</p>

<p>(a)	your access to or use of the App will meet your requirements,
(b)	your access to or use of the App will be uninterrupted, timely, secure or free from error,
(c)	usage data provided through the App will be accurate,
(d)	the App or any content, services, or features made available on or through the App are free of viruses or other harmful components, or
(e)	that any data that you disclose when you use the App will be secured. Some jurisdictions do not allow the exclusion of implied warranties in contracts with consumers, so some or all of the above exclusions may not apply to you.
</p>
<p>You accept the inherent security risks of providing information and dealing online over the Internet and agree that we have no liability or responsibility for any breach of security unless it is due to our gross negligence.
</p>
<p>We will not be responsible or liable to you for any losses you incur as the result of your use of the Blockchain, including but not limited to any losses, damages, or claims arising from:</p>
<p>(a)	user error, such as forgotten passwords or incorrectly construed smart contracts or other transactions;
(b)	server failure or data loss;
(c)	corrupted wallet files;
(d)	unauthorized access or activities by third parties, including but not limited to the use of viruses, phishing, brute-forcing, or other means of attack against the app, Binance Smart Chain, or the Metamask electronic wallet.
</p>
<p>
  NFTs are intangible digital assets that exist only by virtue of the ownership record maintained on the Blockchain. All smart contracts are conducted and occur on the decentralized ledger within Metamask.  ECIO space has no control over and makes no guarantees or promises with respect to the smart contract. ECIO is not responsible for losses due to the blockchains or any other features of the Blockchain including but not limited to late report by developers or representatives (or no report at all) of any issues with the blockchain including forks, technical node issues, or any other issues having fund losses as a result.
</p>
<h3>12. LIMITATION OF LIABILITY
</h3>
<p>You understand and agree that we, our subsidiaries, affiliates, and licensors will not be liable to you or to any third party for any indirect, incidental, special, consequential, or exemplary damages which you may have, including, but not limited to, any loss of profits (both directly and indirectly), loss of goodwill or business reputation, loss of data, cost of procurement of substitute goods or services, or any other intangible loss, even if we have been advised of the possibility of such damages.
</p>
<p>You agree and acknowledge that our total, aggregate liability to you for any and all claims arising out of or relating to these terms or your access to or use of (or your inability to access or use) any portion of the App, whether in contract, tort, strict liability, or any other legal theory, is limited to the greater of
(a)	the amounts you actually paid us under these terms in the fifteen (15) day period preceding the date the claim arose, or
(b)	one hundred (100) US dollars.
</p>
<p>You agree and acknowledge that we have made the App available to you and entered into these terms in reliance upon the warranty disclaimers and limitations of liability set forth herein, which reflect a reasonable and fair allocation of risk between the parties and form an essential basis of the bargain between us. We would not be able to provide the App to you without these limitations.
</p>
<p>Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, and some jurisdictions also limit disclaimers or limitations of liability for personal injury from consumer products, so the above limitations may not apply to personal injury claims.</p>

<h3>13. ASSUMPTION OF RISK</h3>

<p>You accept and acknowledge each of the following:</p>
<p>(a)	The prices of blockchain assets are easy to change because the fluctuations in the price of other digital assets could materially and adversely affect the value of your NFTs, which may also be subject to significant price volatility. We cannot guarantee that any purchasers of NFTs will not lose money.
</p>
<p>(b)	You are solely responsible for any taxes applied to your NFTs-related transactions, according to your own country’s or region’s tax rules. ECIO Space is not responsible for determining the taxes that apply to your transactions on the App.
</p>
<p>(c)	The App does not store, send, and receive NFTs. This is because NFTs exist only by virtue of the ownership record maintained on the App’s supporting blockchain. Any transfer of NFTs occurs only on the Blockchain.
</p>
<p>(d)	There are risks and limitations associated with using an Internet-based currency, including, but not limited to, the risk of hardware, software, and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet. You accept and acknowledge that ECIO Space will not be responsible for any communication failures, disruptions, errors, distortions, or delays you may experience when using the Blockchain.
</p>
<p>(e)	A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of the ECIO Space ecosystem, and therefore the potential utility or value of NFTs.
</p>
<p>(f)	The current state of regulations regarding blockchain technologies, cryptocurrencies, and tokens is uncertain. When new regulations or policies are introduced, they may materially adversely affect the development of the ECIO Space ecosystem, and therefore the potential utility or value of NFTs.
</p>
<h3>14. INDEMNIFICATION</h3>
<p>You agree to indemnify and defend us, including our affiliates and respective directors, officers, and personnel from and against all losses, costs, damages, expenses, and liabilities (including reasonable legal fees and disbursements) that may be suffered or incurred by Third-Party arising out of or as a result of or relating in any manner to a claim relating to:
</p>
<p>(a)	use of the App,</p>
<p>(b)	breach of these Terms of Use,</p>
<p>(c)	any breach of your representations and warranties set forth in these Terms of Use,</p>
<p>(d)	your violation of the rights of a third party, including but not limited to intellectual property rights, or</p>
<p>(e)	any overt harmful act toward any other use of the App with whom you connected via the App.</p>
<p>Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p>
<h3>15. USER DATA</h3>
<p>Certain data, including your data use of the App, will be kept for us to manage the performance of the App. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that release to any activity you have performed using the App. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p>
<h3>16. MISCELLANEOUS
</h3>
<p>These Terms of Use and any policies or operating rules posted by us on the App, or in respect to the App constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, and unenforceable, that particular provision is deemed separable from the whole Terms of Use and does not affect the validity and enforceability of any remaining provisions.
</p>
<p>There is no joint venture, partnership, employment, or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.
</p>
              </div>
        </div>
        <div class="col-12">
          <div class="mt-3">
            <input
              type="checkbox"
              name="agreeBox"
              id="agreeBox"
              v-model="agree"
            />
            <label for="agreeBox" class="text-white text-uppercase text-lg"
              >I have read the above Agreement
            </label>
          </div>
        </div>
        <div class="col-6 my-3">
          <button
            class="btn btn-ecio default w-100 quandro text-2xl"
            @click="$emit('switchModal', '', 'modal-agree')"
          >
            Back
          </button>
        </div>
        <div class="col-6 my-3">
          <button
            class="btn wallet w-100 quandro"
            @click="
              $modal.hide('modal-agree'),
                $emit('setAgree', agree)
            "
            :disabled="!agree"
          >
            AGREE
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  data() {
    return {
      agree: false,
    };
  },
  props: {
    accept: {
      type: Boolean,
      return: false,
    },
  },
  watch: {
    accept() {
      this.agree = this.accept;
    },
  },
};
</script>

<style scoped>
.box-agree {
  height: 250px;
  overflow-y: auto;
  padding-right: 15px;
}
p {
  font-size: 16px !important;
  text-align: justify;
}

h2 {
  font-size: 20px !important;
  margin: 15px 0;
}

h3 {
  font-size: 18px !important;
  margin: 35px 0 15px;
}

.highlight {
  color: #e0fb16 !important;
}
</style>
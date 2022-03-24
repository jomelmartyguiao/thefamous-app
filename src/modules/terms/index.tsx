import logo from 'images/famousLogo.png';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="mt-24 p-5 xl:px-52 xl:py-5">
            <div className='text-gray-600 space-y-3 text-sm p-5 md:p-20 border border-gray-200 shadow rounded-md bg-white'>
                <img src={logo} alt="logo" width={150} className='mx-auto' />
                <h4 className='font-bold text-lg'>Terms of Service</h4>
                <p>Last Updated:</p>

                <ol className="list-decimal ml-6 space-y-3">
                    <li>
                        Introduction
                        <p>The Famous (“TheFamous”, ”The Famous”, “The Platform”, “we,” “us”, or “our”). These Terms of Service (“Terms”) govern your access to and use of the TheFamous website(s), our APIs, mobile app (the “App”), and any other software, tools, features, or functionalities provided on or in connection with our services; including without limitation using our services to view, explore and create NFTs and use our tools, at your own discretion, to connect directly with others to buy, sell, or transfer NFTs on blockchains (collectively, the “Service”). “NFT” in these Terms means a non-fungible token or similar digital item implemented on a blockchain (such as the Algorand blockchain), which uses smart contracts to link to or otherwise be associated with certain content, data and a unique passport that contain verifiable elements.</p>

                        <p>For purposes of these Terms, “user”, “you”, and “your” means you as the user of the Service. If you use the Service on behalf of a company or other entity then “you” includes you and that entity, and you represent and warrant that (a) you are an authorized representative of the entity with the authority to bind the entity to these Terms, and (b) you agree to these Terms on the entity’s behalf.</p>

                        <p className='font-bold'>PLEASE READ THESE TERMS OF SERVICE CAREFULLY AS THEY CONTAIN IMPORTANT INFORMATION AND AFFECT YOUR LEGAL RIGHTS. AS OUTLINED BELOW, THEY INCLUDE A MANDATORY ARBITRATION AGREEMENT AND CLASS ACTION WAIVER WHICH (WITH LIMITED EXCEPTIONS) REQUIRE ANY DISPUTES BETWEEN US TO BE RESOLVED THROUGH INDIVIDUAL ARBITRATION RATHER THAN BY A JUDGE OR JURY IN COURT.</p>

                        <p className="font-bold">BY CLICKING TO ACCEPT AND/OR USING OUR SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL OF THE TERMS INCORPORATED HEREIN BY REFERENCE. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE THE SERVICE.</p>

                        <p>TheFamous is not a wallet provider, exchange, broker, financial institution, or creditor. TheFamous provides a peer-to-peer web3 service that helps users to create and discover NFTs and directly interact with each other and NFTs available on platform blockchains. To use our Service, you must use a third-party wallet which allows you to engage in transactions on blockchains and use currencies allowed on the platform.</p>

                        <p>As buyer of NFTs, you bear full responsibility for verifying the identity, legitimacy, and authenticity of NFTs that you purchase from third-party sellers using the Service and we make no claims about the identity, legitimacy, functionality, or authenticity of users or NFTs (and any content associated with such NFTs) visible on the Service. The platform is facilitating the verification process by associating NFTs to unique Passport with verifiable elements recorded on the blockchain.</p>

                        <p>Additional terms, for specific services (and such services are deemed part of the “Service” hereunder and shall also be subject to these Terms) become part of your agreement with us if you use those services. In the event of a conflict between these Terms and any additional applicable terms we may provide for a specific service, such additional terms shall control for that specific service.</p>

                        <p>TheFamous reserves the right to change or modify these Terms at any time and in our sole discretion. If we make material changes to these Terms, we will use reasonable efforts to provide notice of such changes, such as by providing notice through the Service or updating the “Last Updated” date at the beginning of these Terms. By continuing to access or use the Service, you confirm your acceptance of the revised Terms and all of the terms incorporated therein by reference effective as of the date these Terms are updated. It is your sole responsibility to review the Terms from time to time to view such changes.</p>
                    </li>
                    <li>
                        Accessing the Service
                        <p>Like other web3, your blockchain address will be your identity on TheFamous. You will be allowed to also use your registered email and a password to connect the Service. Accordingly, you will need a blockchain address and a third-party wallet to benefit from the Service. Your account on the service (“Account”) will be associated with your blockchain address and with an original e-signature linked to a unique NFT which will enable you to trade and transfer NFTs; </p>
                        
                        <p>Your Account on TheFamous will be associated with your linked blockchain address and display the NFTs for that blockchain address (and, if applicable, any content associated with such NFTs). Your account will be also associated to a platform wallet where the NFTs you purchased in the platform can be stored. You can anytime transfer your NFTs from the platform wallet to your own blockchain wallet. By using your own wallet in connection with the Service, you agree that you are using that wallet under the terms and conditions of the applicable provider of the wallet. These external wallets are not operated by, maintained by, or affiliated with The platform, and TheFamous does not have control over the contents of your external wallet and has no ability to retrieve or transfer its contents. TheFamous accepts no responsibility for, or liability to you, in connection with your use of an external wallet and makes no representations or warranties regarding how the Service will operate with any specific wallet. You are solely responsible for keeping your external wallet secure and you should never share your wallet credentials or seed phrase with anyone. If you discover an issue related to your wallet, please contact your wallet provider. Likewise, you are solely responsible for your Account and any associated wallet and we are not liable for any acts or omissions by you in connection with your Account or as a result of your Account or wallet being compromised. You agree to immediately notify us if you discover or otherwise suspect any security issues related to the Service or your Account (you can contact us here Support@thefamous.xyz).</p>

                        <p>You also represent and warrant that you will comply with all applicable laws (e.g., local, state, federal and other laws) when using the Service. Without limiting the foregoing, by using the Service, you represent and warrant that your access and use of the Service in your country, territory or jurisdiction does not violate any applicable laws.</p>

                        <p>TheFamous may require you to provide additional information and documents in certain circumstances, such as at the request of any government authority, as any applicable law or regulation dictates, or to investigate a potential violation of these Terms. In such cases, the platform, in its sole discretion, may disable your Account and block your ability to access the Service until such additional information and documents are processed by TheFamous team. If you do not provide complete and accurate information in response to such a request, We may refuse to restore your access to the Service.</p>

                        <p>Your access and use of the Service may be interrupted from time to time for any of several reasons, including, without limitation, the malfunction of equipment, periodic updating, maintenance, or repair of the Service or other actions that The platform, in its sole discretion, may elect to take.</p>

                        <p>We require all users to be at least 18 years old. </p>

                        <p>The Service, including its “look and feel” (e.g., text, graphics, images, logos, page headers, button icons, and scripts), proprietary content, information and other materials, and all content and other materials contained therein, including, without limitation, the logo and all designs, text, graphics, pictures, data, software, sound files, other files, and the selection and arrangement thereof are the proprietary property of TheFamous or our affiliates, licensors, or users, as applicable, and you agree not to take any action(s) inconsistent with such ownership interests. We and our affiliates, licensors, and users, as applicable, reserve all rights in connection with the Service and its content, including, without limitation, the exclusive right to create derivative works.</p>

                        <p>TheFamous name, logo, trademarks, and any product or service names, designs, logos, and slogans are the intellectual property of TheFamous or our affiliates or licensors and may not be copied, imitated or used, in whole or in part, without our prior written permission in each instance. You may not use any metatags or other “hidden text” utilizing “The Famous” or any other name, trademark or product or service name of The Famous a or our affiliates or licensors without our prior written permission. In addition, the “look and feel” of the Service constitutes the service mark, trademark of TheFamous and may not be copied, imitated or used, in whole or in part, without our prior written permission.</p>

                        <p>All other third-party trademarks, registered trademarks, and product names mentioned on the Service or contained in the content linked to or associated with any NFTs displayed on the Service are the property of their respective owners and may not be copied, imitated or used, in whole or in part, without the permission of the applicable intellectual property rights holder. Reference to any products, services, processes or other information by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship, or recommendation by TheFamous.</p>

                        <p>We welcome feedback, comments, and suggestions for improvements to the Service (“Feedback”). You acknowledge and expressly agree that any contribution of Feedback does not and will not give or grant you any right, title, or interest in the Service or in any such Feedback. You agree that The platform may use and disclose Feedback in any manner and for any purpose whatsoever without further notice or compensation to you and without retention by you of any proprietary or other right or claim. You hereby assign to TheFamous any and all right, title, and interest (including, but not limited to, any patent, copyright, trade secret, trademark, show-how, know-how, moral rights and any and all other intellectual property right) that you may have in and to any and all Feedback.</p>
                    </li>
                    <li>
                        License to Access and Use Our Service and Content
                        <p>You are hereby granted a limited, nonexclusive, nontransferable, nonsublicensable, and personal license to access and use the Service provided, however, that such license is subject to your compliance with these Terms. If any software, content, or other materials owned by, controlled by, or licensed to us are distributed or made available to you as part of your use of the Service, we hereby grant you a non-commercial, personal, non-assignable, non-sublicensable, non-transferrable, and non-exclusive right and license to access and display such software, content, and materials provided to you as part of the Service (and right to download a single copy of the App onto your applicable equipment or device), in each case for the sole purpose of enabling you to use the Service as permitted by these Terms, provided that your license in any content linked to or associated with any NFTs is solely as set forth by the applicable seller or creator of such NFT.</p>
                    </li>
                    <li>
                        Third-Party Content and Services
                        <p>As a peer-to-peer web3 service, TheFamous helps you explore NFTs created by third parties with the assistance of the platform and interact with different blockchains. TheFamous does not make any representations or warranties about this third-party content visible through our Service, including any content associated with NFTs displayed on the Service, and you bear responsibility for verifying the legitimacy, authenticity, and legality of NFTs that you purchase from third-party sellers. We also cannot guarantee that any NFTs visible on TheFamous will always remain visible and/or available to be bought, sold, or transferred.</p>

                        <p>NFTs may be subject to terms directly between buyers and sellers with respect to the original work rights, the use of the NFT content and benefits associated with a given NFT (“Purchase Terms”). For example, when you click to get more details about any of the NFTs visible on The platform, you may notice a third party link to the creator’s website. Such website may include Purchase Terms governing the use of the NFT that you will be required to comply with. TheFamous is not a party to any such Purchase Terms, except for the its own collections such as the genesis Famous Conns NFT collection. The Purchase Terms are created by the NFT sellers which are used solely between the buyer and the seller. You are solely responsible for reviewing such Purchase Terms.</p>

                        <p>The Service may also contain links or functionality to access or use third-party websites (“Third-Party Websites”) and applications (“Third-Party Applications”), or otherwise display, include, or make available content, data, information, services, applications, or materials from third parties (“Third-Party Materials”). When you click on a link to, or access and use, a Third-Party Website or Third-Party Application, though we may not warn you that you have left our Service, you are subject to the terms and conditions (including privacy policies) of another website or destination. Such Third-Party Websites, Third-Party Applications, and Third-Party Materials are not under the control of TheFamous, and may be “open” applications for which no recourse is possible. The platform is not responsible or liable for any Third-Party Websites, Third-Party Applications, and Third-Party Materials. The platform provides links to these Third-Party Websites and Third-Party Applications only as a convenience and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Websites or Third-Party Applications, or their products or services or associated Third-Party Materials. You use all links in Third-Party Websites, Third-Party Applications, and Third-Party Materials at your own risk.</p>
                    </li>
                    <li>
                        User Conduct
                        <p>To protect our community and comply with our legal obligations, we reserve the right to take action, with or without advance notice, if we believe you have violated these Terms. This may include: removing the ability to view certain NFTs on the Service or use our Service to interact with the NFTs; disabling the ability to use the Service in conjunction with buying/selling/transferring NFTs available on blockchains; disabling your ability to access our Service; and/or other actions.</p>

                        <p>You agree that you will not violate any law, contract, intellectual property or other third-party right, and that you are solely responsible for your conduct and content, while accessing or using the Service. You also agree that you will not:</p>

                        <ul className="list-disc ml-6">
                            <li>
                                Use or attempt to use another user’s Account without authorization from such user;
                            </li>
                            <li>
                                Pose as another person or entity;
                            </li>
                            <li>
                                Claim a username for the purpose of reselling it or otherwise engage in name squatting;
                            </li>
                            <li>
                                Access the Service from a different blockchain address if we’ve blocked any of your other blockchain addresses from accessing the Service, unless you have our written permission first;
                            </li>
                            <li>
                                Distribute spam, including through sending unwanted NFTs to other users;
                            </li>
                            <li>
                                Use the Service – including through disseminating any software or interacting with any API – that could damage, disable, overburden, or impair the functioning of the Service in any manner;
                            </li>
                            <li>
                                Bypass or ignore instructions that control access to the Service, including attempting to circumvent any rate limiting systems by using multiple API keys, directing traffic through multiple IP addresses, or otherwise obfuscating the source of traffic you send to TheFamous.
                            </li>
                            <li>
                                Use any data mining, robot, spider, crawler, scraper, script, browser extension, offline reader, or other automated means or interface not authorized by us to access the Service, extract data, or otherwise interfere with or modify the rendering of Service pages or functionality;
                            </li>
                            <li>
                                Reverse engineer, duplicate, decompile, disassemble, or decode any aspect of the Service, or do anything that might discover source code or bypass or circumvent measures employed to prevent or limit access to any service, area, or code of the Service;
                            </li>
                            <li>
                                Sell or resell the Service or attempt to circumvent any fee systems;
                            </li>
                            <li>
                                Engage in behaviors that have the intention or the effect of artificially causing a listing to appear at the top of search results, or artificially increasing view counts, favorites, volume, or other metrics that The platform might use to sort search results;
                            </li>
                            <li>
                                Use the Service or data collected from our Service for any advertising or direct marketing activity (including without limitation, email marketing;
                            </li>
                            <li>
                                Use the Service for money laundering, terrorist financing, or other illicit finance;
                            </li>
                            <li>
                                Use the Service from a country sanctioned by the government of the United States or to facilitate transactions involving individuals sanctioned by the government of the United States or located in sanctioned countries;
                            </li>
                            <li>
                                Use the Service to carry out any financial activities subject to registration or licensing, including but not limited to creating, selling, or buying securities, commodities, options, or debt instruments;
                            </li>
                            <li>
                                Use the Service to create, sell, or buy NFTs or other items that give owners rights to participate in an ICO or any securities offering, or that are redeemable for securities;
                            </li>
                            <li>
                                Use the Service to engage in price manipulation, fraud, or other deceptive, misleading, or manipulative activity;
                            </li>
                            <li>
                                Use the Service to buy, sell, or transfer stolen items, fraudulently obtained items, items taken without authorization, and/or any other illegally obtained items;
                            </li>
                            <li>
                                Infringe or violate the intellectual property rights or any other rights of others;
                            </li>
                            <li>
                                Create or display illegal content, such as content that may involve child sexual exploitation;
                            </li>
                            <li>
                                Create or display NFTs or other items that promote suicide or self-harm, incites hate or violence against others, or doxes another individual;
                            </li>
                            <li>
                                Use the Service for any illegal or unauthorized purpose, including creating or displaying illegal content, such as content that may involve child sexual exploitation, or encouraging or promoting any activity that violates the Terms of Service;
                            </li>
                            <li>
                                Use the Service in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying the Service.
                            </li>

                            <p>Finally, by using the Service, you understand the importance of DYOR – doing your own research. You bear full responsibility for verifying the authenticity, legitimacy, identity, and other details about any NFT, collection, or account that you view or otherwise interact with in conjunction with our Service. We make no guarantees or promises about the identity, legitimacy, or authenticity of any NFT, collection, or account on the Service.</p>
                        </ul>
                    </li>
                    <li>
                        Intellectual Property Rights
                        <p>You are solely responsible for your use of the Service and for any information you provide, including compliance with applicable laws, rules, and regulations, as well as these Terms, including the User Conduct requirements outlined above.</p>

                        <p>By using the Service in conjunction with creating, submitting, posting, promoting, or displaying content, or by complying with The platform’s metadata standards in your metadata API responses, you grant us a worldwide, non-exclusive, sub licensable, royalty-free license to use, copy, modify, and display any content, including but not limited to text, materials, images, files, communications, comments, feedback, suggestions, ideas, concepts, questions, data, or otherwise, that you submit or post on or through the Service for our current and future business purposes, including to provide, promote, and improve the Service. This includes any digital file, art, or other material linked to or associated with any NFTs that are displayed on the Service.</p>

                        <p>You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any content that you create, submit, post, promote, or display on or through the Service. You represent and warrant that such content does not contain material subject to copyright, trademark, publicity rights, or other intellectual property rights, unless you have necessary permission or are otherwise legally entitled to post the material and that the content does not violate any laws.</p>

                        <p>TheFamous will take down works in response to Digital Millennium Copyright Act (“DMCA”) takedown notices and/or other intellectual property infringement claims and will terminate a user's access to the Service if the user is determined to be a repeat infringer. If you believe that your content has been copied in a way that constitutes copyright or trademark infringement, or violates your publicity or other intellectual property rights, please contact us at support@thefamous.xyz</p>

                        <p>For us to process your infringement claim regarding content on the Service, you must be the rights holder or someone authorized to act on behalf of the rights holder, your email notice must include:</p>

                        <ul className="list-disc ml-6">
                            <li>
                                Identification of the copyrighted work(s), trademark, publicity rights, or other intellectual property rights that you claim is being infringed;
                            </li>
                            <li>
                                Identification of the allegedly infringing material that is requested to be removed, including a description of the specific location (i.e., urls) on the Service of the material claimed to be infringing, so that we may locate the material;
                            </li>
                            <li>
                                Your contact information – at a minimum, your full legal name (not pseudonym) and email address;
                            </li>
                            <li>
                                A declaration that contains all of the following:
                                <ul className="list-disc ml-6">
                                    <li>
                                        A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the intellectual property rights owner, its agent, or the law;
                                    </li>
                                    <li>
                                        A statement that the information in the notice is accurate; and
                                    </li>
                                    <li>
                                        A statement under penalty of perjury that you are authorized to act on behalf of the intellectual property owner of the intellectual property that is allegedly being infringed.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Your physical or electronic signature (of your full legal name).
                            </li>
                        </ul>

                        <p>Please note that we will forward your notice of intellectual property infringement, including your contact information, to the party who will have their content removed so they understand why it is no longer available on TheFamous and can also contact you to resolve any dispute.</p>
                    </li>
                    <li>
                        Communication Preferences
                        <p>By creating an Account, you consent to receive electronic communications from TheFamous (e.g., via email, push notification, or other types of messages). These communications may include notices about your Account (e.g., transactional information) and are part of your relationship with us. We may also send you promotional communications via email we think will be of interest to you. You understand that you are not required to provide this consent as a condition of using the Service and you may opt out of these communications through the Service or through your mobile device’s operating system (with the possible exception of important service announcements and administrative messages) by following the unsubscribe instructions provided.</p>
                    </li>
                    <li>
                        App Terms
                        <p>You are responsible for providing the mobile device, wireless service plan, software, Internet connections, and/or other equipment or services that you need to download, install, and use the App. We do not guarantee that the App can be accessed and used on any particular device or with any particular service plan. We do not guarantee that the App or Service will be available in any particular geographic location.</p>
                    </li>
                    <li>
                        Indemnification
                        <p>By agreeing to these Terms and accessing the Service, you agree, to the fullest extent permitted by applicable law, to indemnify, defend, and hold harmless TheFamous, and our respective past, present, and future employees, officers, directors, contractors, consultants, equity holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents, representatives, predecessors, successors, and assigns (individually and collectively, the “TheFamous Parties”), from and against all actual or alleged claims, damages, awards, judgments, losses, liabilities, obligations, penalties, interest, fees, expenses (including, without limitation, attorneys’ fees and expenses), and costs (including, without limitation, court costs, costs of settlement, and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract, or otherwise (collectively, “Claims”), including, but not limited to, damages to property or personal injury, that are caused by, arise out of or are related to (a) your use or misuse of the Service, content, NFTs, or content linked to or associated with any NFTs (b) any Feedback you provide, (c) your violation or breach of any term of these Terms or applicable law, and (d) your violation of the rights of or obligations to a third party, including another user or third-party, and (e) your negligence or willful misconduct. You agree to promptly notify The platform of any Claims and cooperate with the TheFamous Parties in defending such Claims. You further agree that the Platform Parties shall have control of the defense or settlement of any Claims. THIS INDEMNITY IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER INDEMNITIES SET FORTH IN A WRITTEN AGREEMENT BETWEEN YOU AND THEFAMOUS.</p>
                    </li>
                    <li>
                        Disclaimers
                        <p className='font-bold'>YOUR ACCESS TO AND USE OF THE SERVICE IS AT YOUR OWN RISK. YOU UNDERSTAND AND AGREE THAT THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS AND THEFAMOUS EXPRESSLY DISCLAIMS WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. THEFAMOUS (AND ITS SUPPLIERS) MAKE NO WARRANTY OR REPRESENTATION AND DISCLAIM ALL RESPONSIBILITY FOR WHETHER THE SERVICE: (A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE. THEFAMOUS DISCLAIMS ALL OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. THEFAMOUS WILL NOT BE LIABLE FOR ANY LOSS OF ANY KIND FROM ANY ACTION TAKEN OR TAKEN IN RELIANCE ON MATERIAL OR INFORMATION, CONTAINED ON THE SERVICE. WHILE THEFAMOUS ATTEMPTS TO MAKE YOUR ACCESS TO AND USE OF THE SERVICE SAFE, THE PLATFORM CANNOT AND DOES NOT REPRESENT OR WARRANT THAT THE SERVICE, CONTENT, CONTENT LINKED TO OR ASSOCIATED WITH ANY NFTS, OR ANY NFTS YOU INTERACT WITH USING OUR SERVICE OR OUR SERVICE PROVIDERS’ SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE CANNOT GUARANTEE THE SECURITY OF ANY DATA THAT YOU DISCLOSE ONLINE. NO ADVICE OR INFORMATION, WHETHER ORAL OR OBTAINED FROM THE FAMOUS PARTIES OR THROUGH THE SERVICE, WILL CREATE ANY WARRANTY OR REPRESENTATION NOT EXPRESSLY MADE HEREIN. YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET AND WILL NOT HOLD THEFAMOUS RESPONSIBLE FOR ANY BREACH OF SECURITY. WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS AND TAKE NO RESPONSIBILITY FOR, AND WILL NOT BE LIABLE TO YOU FOR, ANY USE OF NFTS, CONTENT, AND/OR CONTENT LINKED TO OR ASSOCIATED WITH NFTS, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES, OR CLAIMS ARISING FROM: (A) USER ERROR, INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED ADDRESSES; (B) SERVER FAILURE OR DATA LOSS; (C) UNAUTHORIZED ACCESS OR USE; (D) ANY UNAUTHORIZED THIRD-PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE SERVICE OR NFTS. NFTS EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED IN THE ASSOCIATED BLOCKCHAIN (E.G., ALGORAND NETWORK). ANY TRANSFERS OR SALES OCCUR ON THE ASSOCIATED BLOCKCHAIN (E.G., ALGORAND). THEFAMOUS AND/OR ANY OTHER THEFAMOUS PARTY CANNOT EFFECT OR OTHERWISE CONTROL THE TRANSFER OF TITLE OR RIGHT IN ANY NFTS OR UNDERLYING OR ASSOCIATED CONTENT OR ITEMS. NO THEFAMOUS PARTY IS RESPONSIBLE OR LIABLE FOR ANY SUSTAINED LOSSES OR INJURY DUE TO VULNERABILITY OR ANY KIND OF FAILURE, ABNORMAL BEHAVIOR OF SOFTWARE (E.G., WALLET, SMART CONTRACT), BLOCKCHAINS OR ANY OTHER FEATURES OF THE NFTS. NO THEFAMOUS PARTY IS RESPONSIBLE FOR LOSSES OR INJURY DUE TO LATE REPORTS BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE BLOCKCHAIN SUPPORTING THE NFTS, INCLUDING FORKS, TECHNICAL NODE ISSUES OR ANY OTHER ISSUES HAVING LOSSES OR INJURY AS A RESULT.</p>

                        <p>Some jurisdictions do not allow the exclusion of implied warranties in contracts with consumers, so the above exclusion may not apply to you.</p>
                    </li>
                    <li>
                        Assumption of Risk
                        <p>You accept and acknowledge:</p>
                        <ul className="list-disc ml-6">
                            <li>
                                The value of an NFTs is subjective. Prices of NFTs are subject to volatility and fluctuations in the price of cryptocurrency can also materially and adversely affect NFT prices. You acknowledge that you fully understand this subjectivity and volatility and that you may lose money.
                            </li>
                            <li>
                                A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of those ecosystems and related applications, and could therefore also negatively impact the potential utility of NFTs.
                            </li>
                            <li>
                                The regulatory regime governing blockchain technologies, non-fungible tokens, cryptocurrency, and other crypto-based items is uncertain, and new regulations or policies may materially adversely affect the development of the Service and the utility of NFTs.
                            </li>
                            <li>
                                You are solely responsible for determining what, if any, taxes apply to your transactions. TheFamous is not responsible for determining the taxes that apply to your NFTs.
                            </li>
                            <li>
                                There are risks associated with purchasing items associated with content created by third parties through peer-to-peer transactions, including but not limited to, the risk of purchasing counterfeit items, mislabeled items, items that are vulnerable to metadata decay, items on smart contracts with bugs, and items that may become untransferable. You represent and warrant that you have done sufficient research before making any decisions to sell, obtain, transfer, or otherwise interact with any NFTs or accounts/collections.
                            </li>
                            <li>
                                We do not control the blockchains that you are interacting with and we do not control certain smart contracts and protocols that may be integral to your ability to complete transactions on these blockchains. Additionally, blockchain transactions are irreversible and The platform has no ability to reverse any transactions on the blockchain.
                            </li>
                            <li>
                                There are risks associated with using Internet and blockchain based products, including, but not limited to, the risk associated with hardware, software, and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to your third-party wallet or Account. You accept and acknowledge that TheFamous will not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Service or any Blockchain network, however caused.
                            </li>
                            <li>
                                The Service relies on third-party platforms and/or vendors. If we are unable to maintain a good relationship with such platform providers and/or vendors; if the terms and conditions or pricing of such platform providers and/or vendors change; if we violate or cannot comply with the terms and conditions of such platforms and/or vendors; or if any of such platforms and/or vendors loses market share or falls out of favor or is unavailable for a prolonged period of time, access to and use of the Service will suffer.
                            </li>
                            <li>
                                TheFamous reserves the right to hide collections, contracts, and items affected by any of these issues or by other issues. Items you purchase may become inaccessible on TheFamous. Under no circumstances shall the inability to view items on TheFamous or an inability to use the Service in conjunction with the purchase, sale, or transfer of items available on any blockchains serve as grounds for a claim against TheFamous.
                            </li>
                            <li>
                                If you have a dispute with one or more users, YOU RELEASE US FROM CLAIMS, DEMANDS, AND DAMAGES OF EVERY KIND AND NATURE, KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH DISPUTES. IN ENTERING INTO THIS RELEASE YOU EXPRESSLY WAIVE ANY PROTECTIONS (WHETHER STATUTORY OR OTHERWISE) THAT WOULD OTHERWISE LIMIT THE COVERAGE OF THIS RELEASE TO INCLUDE THOSE CLAIMS WHICH YOU MAY KNOW OR SUSPECT TO EXIST IN YOUR FAVOR AT THE TIME OF AGREEING TO THIS RELEASE.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Limitation of Liability
                        <p className='font-bold'>TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AGREE THAT IN NO EVENT WILL THEFAMOUS OR ITS SERVICE PROVIDERS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM THESE TERMS OR THE SERVICE, PRODUCTS OR THIRD-PARTY SITES AND PRODUCTS, OR FOR ANY DAMAGES RELATED TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, OR LOSS OF DATA, AND WHETHER CAUSED BY STRICT LIABILITY OR TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF THEFAMOUS OR ITS SERVICE PROVIDERS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; OR (B) FOR ANY OTHER CLAIM, DEMAND, OR DAMAGES WHATSOEVER RESULTING FROM OR ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OF THE DELIVERY, USE, OR PERFORMANCE OF THE SERVICE. ACCESS TO, AND USE OF, THE SERVICE, PRODUCTS OR THIRD-PARTY SITES, AND PRODUCTS ARE AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA RESULTING THEREFROM. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY OF THEFAMOUS ARISING OUT OF OR IN ANY WAY RELATED TO THESE TERMS, THE ACCESS TO AND USE OF THE SERVICE, CONTENT, NFTS, OR ANY THEFAMOUS PRODUCTS OR SERVICES EXCEED THE GREATER OF (A) $100 OR (B) THE AMOUNT RECEIVED BY THEFAMOUS FOR ITS SERVICE DIRECTLY RELATING TO THE ITEMS THAT ARE THE SUBJECT OF THE CLAIM. THE FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.</p>

                        <p>Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to you. Some jurisdictions also limit disclaimers or limitations of liability for personal injury from consumer products, so this limitation may not apply to personal injury claims.</p>
                    </li>
                    <li>
                        Privacy Policy
                        <p>Please refer to our <Link to="/privacy" className="text-blue-400">Privacy Policy</Link> for information about how we collect, use, and share personal data about you. By submitting personal data through our Service, you agree to the terms of our Privacy Policy and you expressly consent to the collection, use, and disclosure of your personal data in accordance with the Privacy Policy.</p>
                    </li>
                    <li>
                        Modifications to the Service
                        <p>We reserve the right in our sole discretion to modify, suspend, or discontinue, temporarily or permanently, the Service (or any features or parts thereof) at any time and without liability as a result.</p>
                    </li>
                    <li>
                        Dispute Resolution; Arbitration
                        <ul className="list-disc ml-6">
                            <li>
                                Dispute Resolution. Please read the following arbitration agreement in this Section (“Arbitration Agreement”) carefully. It requires you to arbitrate disputes with TheFamous and limits the manner in which you can seek relief from us. This section does not govern disputes between users or between users and third parties. TheFamous does not provide dispute resolution services for such disagreements and the parties must resolve those disputes directly.
                            </li>
                            <li>
                                Applicability of Arbitration Agreement. You agree that any dispute, controversy, or claim relating in any way to your access or use of the Service, to any products sold or distributed through the Service, or to any aspect of your relationship with TheFamous, will be resolved by binding arbitration, rather than in court, including threshold questions of the arbiter ability of such dispute, controversy, or claim except that (1) you or TheFamous may assert claims in small claims court, but only if the claims qualify, the claims remain only in such court, and the claims remain on an individual, non-representative, and non-class basis; and (2) you or TheFamous may seek injunctive or equitable relief in a court of proper jurisdiction if the claim relates to intellectual property infringement or other misuse of intellectual property rights.
                            </li>
                            <li>
                                Dispute resolution process. You and TheFamous both agree to engage in good-faith efforts to resolve disputes prior to either party initiating an arbitration, small claims court proceeding, or equitable relief for intellectual property infringement. You must initiate this dispute resolution process by sending a letter describing the nature of your claim and desired resolution to: The Famous, Attn: Legal@thefamous.xyz Both parties agree to meet via video call to discuss the dispute and attempt in good faith to reach a mutually beneficial outcome that avoids the expenses of arbitration or, where applicable, litigation. If you are represented by counsel, your counsel may participate in the Conference as well, but you agree to fully participate in the Conference. Likewise, if TheFamous is represented by counsel, its counsel may participate in the Conference as well, but TheFamous agrees to have a company representative fully participate in the Conference. The statute of limitations and any filing fee deadlines shall be tolled while the parties engage in the informal dispute resolution process and Conference required by this paragraph. If the parties do not reach agreement to resolve the dispute within thirty (30) days after initiation of this dispute resolution process, either party may commence arbitration, file an action in small claims court, or file a claim for injunctive or equitable relief in a court of proper jurisdiction for matters relating to intellectual property infringement, if the claims qualify.
                            </li>
                            <li>
                                To begin an arbitration proceeding after participating in the dispute resolution process, you must send a letter requesting arbitration and describing your claim at TheFamous legal department: Legal@thefamous.xyz The arbitration will be conducted by a dispute resolution provider agreed by the parties. 
                            </li>
                            <li>
                                Waiver of Jury Trial. YOU AND THEFAMOUS HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and TheFamous are instead electing that all claims and disputes shall be resolved by arbitration under this Arbitration Agreement, except as specified in the second bullet of this Section 16, above (“Applicability of Arbitration Agreement”). An arbitrator can award on an individual basis the same damages and relief as a court and must follow these Terms as a court would. However, there is no judge or jury in arbitration, and court review of an arbitration award is subject to very limited review.
                            </li>
                            <li>
                                Waiver of Class Actions and Class Arbitrations. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A REPRESENTATIVE OR COLLECTIVE CLASS BASIS. ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND CLAIMS OF MORE THAN ONE USER, PERSON, OR ENTITY CANNOT BE ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER USER, PERSON, OR ENTITY. Accordingly, under the arbitration procedures outlined in this section, an arbitrator shall not combine or consolidate more than one party’s claims without the written consent of all affected parties to an arbitration proceeding. Without limiting the generality of the foregoing, you and TheFamous agree that no dispute shall proceed by way of class arbitration without the written consent of all affected parties. If a decision is issued stating that applicable law precludes enforcement of any part of this subsection’s limitations as to a given claim for relief, then that claim must be severed from the arbitration and brought in the courts in a location agreed by the parties. All other claims shall be arbitrated.
                            </li>
                            <li>
                                Severability. Except as provided in this Section, if any part or parts of this Arbitration Agreement are found under the law to be invalid or unenforceable, then such specific part or parts shall be of no force and effect and shall be severed and the remainder of the Arbitration Agreement shall continue in full force and effect.
                            </li>
                            <li>
                                Survival of Agreement. This Arbitration Agreement will survive the termination of your relationship with TheFamous.
                            </li>
                            <li>
                                Modification. Notwithstanding any provision in these Terms to the contrary, we agree that if TheFamous makes any future material change to this Arbitration Agreement, you may reject that change within thirty (30) days of such change becoming effective by writing to TheFamous at the following address: TheFamous, Legal department: Legal@thefamous.xyz
                            </li>
                        </ul>
                    </li>
                    <li>
                        Governing Law and Venue
                        <p>These Terms and your access to and use of the Service shall be governed by and construed and enforced in accordance with the laws of Hong Kong). Any dispute between the parties that is not subject to arbitration as set forth in Section 16 or cannot be heard in small claims court, shall be resolved in courts of a country and location agreed by the parties</p>
                    </li>
                    <li>
                        Termination
                        <p>If you breach any of the provisions of these Terms, all licenses granted by TheFamous will terminate automatically. Additionally, notwithstanding anything contained in these Terms, we reserve the right, with or without notice and in our sole discretion, to suspend, disable, terminate, or delete your Account and/or your ability to access or use the Service (or any part of the foregoing) at any time and for any or no reason, and you acknowledge and agree that we shall have no liability or obligation to you in such event and that you will not be entitled to a refund of any amounts that you have already paid to us.</p>
                    </li>
                    <li>
                        Severability
                        <p>If any term, clause, or provision of these Terms is held invalid or unenforceable, then that term, clause, or provision will be severable from these Terms and will not affect the validity or enforceability of any remaining part of that term, clause, or provision, or any other term, clause, or provision of these Terms.</p>
                    </li>
                    <li>
                        Injunctive Relief
                        <p>You agree that a breach of these Terms will cause irreparable injury to TheFamous for which monetary damages would not be an adequate remedy and TheFamous shall be entitled to equitable relief in addition to any remedies it may have hereunder or at law without a bond, other security, or proof of damage.</p>
                    </li>
                    <li>
                        Survival
                        <p>All sections which by their nature should survive the termination of these Terms shall continue in full force and effect subsequent to and notwithstanding any termination of these Terms by TheFamous or you. Termination will not limit any of TheFamous’ other rights or remedies at law or in equity.</p>
                    </li>
                    <li>
                        Miscellaneous
                        <p>These Terms constitute the entire agreement between you and TheFamous relating to your access to and use of the Service. These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you without the prior written consent of TheFamous, and TheFamous’ failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision. No waiver by either party of any breach or default hereunder shall be deemed to be a waiver of any preceding or subsequent breach or default. The section headings used herein are for reference only and shall not be read to have any legal effect.</p>

                        <p>Except as otherwise provided herein, these Terms are intended solely for the benefit of the parties and are not intended to confer third-party beneficiary rights upon any other person or entity.</p>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Terms;
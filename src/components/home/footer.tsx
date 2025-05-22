import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons";

export default function Footer() {
    return (
        <>
            <footer className="w-full h-32 sm:h-52 flex justify-center">
                <div className="w-4/5 flex flex-col justify-center items-center">
                    <div className="w-2/3 sm:w-2/5 lg:w-1/4 mb-0 sm:mb-5 pb-3 sm:pb-0 flex justify-around">
                        <div className="size-6 sm:size-10">
                            <a href="https://github.com/surajprojects" target="_blank">
                                <GithubIcon />
                            </a>
                        </div>

                        <div className="size-6 sm:size-10">
                            <a href="https://www.linkedin.com/in/surajchauhan23" target="_blank">
                                <LinkedinIcon />
                            </a>
                        </div>
                        <div className="size-5 sm:size-8 pt-1">
                            <a href="https://twitter.com/tigerxinsights" target="_blank">
                                <TwitterIcon />
                            </a>
                        </div>
                        <div className="size-6 sm:size-10">
                            <a href="https://www.youtube.com/@tigerxinsights" target="_blank">
                                <YoutubeIcon />
                            </a>
                        </div>
                    </div>
                    <div className="text-sm sm:text-base text-black font-medium text-center flex flex-col items-center">
                        <span>Made with ❤️ by TigerxInsights &copy; 2025</span>
                        <span>Your insights, our priority</span>
                    </div>
                </div>
            </footer>
        </>
    );
};
const markup = {
    audioOriginal: `<a href="#slide-audio " class="dl__item-audio">
                                        <div class="dl__item-audio_info-pane__left dl__item-audio_info-pane">
                                            <h4 class="dl__item-audio__data__property dl__item-audio__data__property-title">
                                                %{title}
                                            </h4>
                                        </div>
                                        <div class="dl__item-audio_info-pane__right dl__item-audio_info-pane">
                                            <p class="dl__item-audio__data__property dl__item-audio__data__property-file-length">
                                                %{lengthFormatted}
                                            </p>
                                        </div>
                                    </a>`,
    audio: `<a href="#slide-audio " class="dl__item-audio">
                                        <div class="dl__item-audio_info-pane__left dl__item-audio_info-pane">
                                            <h4 class="dl__item-audio__data__property dl__item-audio__data__property-title">
                                                %{title}
                                            </h4>
                                        </div>
                                        <div class="dl__item-audio_info-pane__right dl__item-audio_info-pane">
                                            <p class="dl__item-audio__data__property dl__item-audio__data__property-file-length">
                                                %{lengthFormatted}
                                            </p>
                                        </div>
                                    </a>`,
    videoOriginal: `<a href="#slide-video" class="dl__item">
                                    <div
                                        class="dl__item_info-pane dl__item__thumbnail"
                                    >
                                        <img
                                            src="%{thumbnail}"
                                            alt="Test"
                                        />
                                    </div>
                                    <div
                                        class="dl__item_info-pane dl__item_info-pane-data"
                                    >
                                        <div class="dl__item_info-pane__top">
                                            <h4
                                                class="dl__item__data__property dl__item__data__property-title"
                                            >
                                               %{title}
                                            </h4>
                                        </div>
                                        <div class="dl__item_info-pane__bottom">
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-length"
                                            >
                                                %{lengthFormatted}
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-size"
                                            >
                                                272.3 MB
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-format"
                                            >
                                                %{fileType}
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-res"
                                            >
                                                %{height}p
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-fps"
                                            >
                                                %{fps}fps
                                            </p>
                                        </div>
                                    </div>
                                </a>`,

    video: `<a href="#slide-video" class="dl__item">
                                    <div
                                        class="dl__item_info-pane dl__item__thumbnail"
                                    >
                                        <img
                                            src="%{thumbnail}"
                                            alt="Test"
                                        />
                                    </div>
                                    <div
                                        class="dl__item_info-pane dl__item_info-pane-data"
                                    >
                                        <div class="dl__item_info-pane__top">
                                            <h4
                                                class="dl__item__data__property dl__item__data__property-title"
                                            >
                                               %{title}
                                            </h4>
                                        </div>
                                        <div class="dl__item_info-pane__bottom">
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-length"
                                            >
                                                %{lengthFormatted}
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-size"
                                            >
                                                272.3 MB
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-format"
                                            >
                                                %{fileType}
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-res"
                                            >
                                                %{height}p
                                            </p>
                                            <p
                                                class="dl__item__data__property dl__item__data__property-file-fps"
                                            >
                                                %{fps}fps
                                            </p>
                                        </div>
                                    </div>
                                </a>`,
};

module.exports = markup;
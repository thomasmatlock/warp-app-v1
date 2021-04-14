const markup = {
    audio: `<a href="#slide-audio" class="dl__item dl__item_audio">
                                <div class="dl__item_info-pane__left">

                                    <div class="dl__item_info-pane dl__item__thumbnail">
                                        <img src="%{thumbnail}" alt="Test" />
                                    </div>
                                    <div class="dl__item_info-pane dl__item_info-pane-data">
                                        <div class="dl__item_info-pane__top dl__item_info-pane_indexMarker">
                                            <h4 class="dl__item__data__property dl__item__data__property-title">%{title}</h4>
                                        </div>
                                        <div class="dl__item_info-pane__bottom dl__item_info-pane_indexMarker">
                                            <p class="dl__item__data__property dl__item__data__property-file-length">
                                                %{lengthFormatted}
                                            </p>
                                            <p class="dl__item__data__property dl__item__data__property-file-size">
                                                272.3 MB
                                            </p>
                                            <p class="dl__item__data__property dl__item__data__property-file-format">
                                                %{fileType}
                                            </p>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="dl__item_info-pane__right">
                                    <div class="dl__item_info-pane__right__openContainingFolder">
                                        <i class="far fa-folder-open"></i>
                                    </div>
                                    <div class="dl__item_info-pane__right__moreActions">
                                        <i class="fas fa-cog"></i>
                                    </div>
                                </div>
                    </div>
                    </a>`,

    video: `<a href="#slide-video" class="dl__item dl__item_video">
                                <div class="dl__item_info-pane__left">

                                    <div class="dl__item_info-pane dl__item__thumbnail">
                                        <img src="%{thumbnail}" alt="Test" />
                                    </div>
                                    <div class="dl__item_info-pane dl__item_info-pane-data">
                                        <div class="dl__item_info-pane__top dl__item_info-pane_indexMarker">
                                            <h4 class="dl__item__data__property dl__item__data__property-title">%{title}</h4>
                                        </div>
                                        <div class="dl__item_info-pane__bottom dl__item_info-pane_indexMarker">
                                            <p class="dl__item__data__property dl__item__data__property-file-length">
                                                %{lengthFormatted}
                                            </p>
                                            <p class="dl__item__data__property dl__item__data__property-file-size">
                                                272.3 MB
                                            </p>
                                            <p class="dl__item__data__property dl__item__data__property-file-format">
                                                %{fileType}
                                            </p>
                                            <p class="dl__item__data__property dl__item__data__property-file-res">
                                                %{height}p
                                            </p>
                                            <p class="dl__item__data__property dl__item__data__property-file-fps">
                                                %{fps}fps
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="dl__item_info-pane__right">
                                    <div class="dl__item_info-pane__right__openContainingFolder">
                                        <i class="far fa-folder-open"></i>
                                    </div>
                                    <div class="dl__item_info-pane__right__moreActions">
                                        <i class="fas fa-cog"></i>
                                    </div>
                                </div>
                    </div>
                    </a>`,
};

module.exports = markup;
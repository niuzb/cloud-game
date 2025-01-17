/**
 * Game room module.
 * @version 1
 */
const room = (() => {
    let id = '';

    // UI
    const roomLabel = $('#room-txt');

    // !to rewrite
    const parseURLForRoom = () => {
        let queryDict = {};

        location.search.substr(1)
            .split('&')
            .forEach((item) => {
                queryDict[item.split('=')[0]] = item.split('=')[1]
            });

        if (typeof queryDict.id === 'string') {
            return decodeURIComponent(queryDict.id);
        }

        return null;
    };

    event.sub(GAME_ROOM_AVAILABLE, data => {
        room.setId(data.roomId);
        room.save(data.roomId);
    }, 1);

    return {
        getId: () => id,
        setId: (id_) => {
            id = id_;
            roomLabel.val(id);
        },
        reset: () => {
            id = '';
            roomLabel.val(id);
        },
        save: (roomIndex) => {
            localStorage.setItem('roomID', roomIndex);
        },
        load: () => localStorage.getItem('roomID'),
        getLink: () => window.location.href.split('?')[0] + `?id=${encodeURIComponent(room.getId())}`,
        loadMaybe: () => {
            // localStorage first
            //roomID = loadRoomID();

            // Shared URL second
            const parsedId = parseURLForRoom();
            if (parsedId !== null) {
                id = parsedId;
            }

            return id;
        },
        copyToClipboard: () => {
            const el = document.createElement('textarea');
            el.value = room.getLink();
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }
})(document, event, location, localStorage, window);

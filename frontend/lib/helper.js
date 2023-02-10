import { DateTime } from "luxon";
import sanitizeHtml from "sanitize-html";
import { buildUrl } from "cloudinary-build-url";

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export const cloudinaryUrl = (publicId, width, height, resizeType = "fill") =>
  buildUrl(publicId, {
    cloud: {
      cloudName: "climact",
    },
    transformations: {
      quality: "auto:best",
      resize: {
        type: resizeType,
        width: width,
        height: height,
      },
      gravity: resizeType != "pad" && "auto",
      format: "webp",
      dpr: "3.0",
    },
  });

export const checkFormError = (errors, touched, name) => {
  return `${
    errors[name] && touched[name] ? "is-invalid form-icon-trailing" : ""
  } ${!errors[name] && touched[name] ? "is-valid" : ""}`;
};

export function truncateWithEllipses(text, max) {
  return text.substr(0, max - 1) + (text.length > max ? "..." : "");
}

export function truncateWithReadmore(text, max) {
  return text.substr(0, max - 1) + (text.length > max ? "<a" : "");
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function formatDateHuge(date) {
  let newDate = date;
  return DateTime.fromISO(newDate)
    .setLocale("fr")
    .toLocaleString(DateTime.DATE_HUGE);
}

export function formatDateFull(date) {
  let newDate = date;
  return DateTime.fromISO(newDate)
    .setLocale("fr")
    .toLocaleString(DateTime.DATE_FULL);
}

export function formatDateMed(date, locale) {
  let newDate = date;
  return DateTime.fromISO(newDate)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_MED);
}

export function formatDateTimeMed(date, locale) {
  let newDate = date;
  return DateTime.fromISO(newDate)
    .setLocale(locale)
    .toLocaleString(DateTime.DATETIME_MED);
}

export function formatTimeMed(date, locale) {
  let newDate = date;
  return DateTime.fromISO(newDate)
    .setLocale(locale)
    .toLocaleString(DateTime.TIME_24_SIMPLE);
}
export function formatTimeDuration(date, duration, locale) {
  let newDate = date;
  return DateTime.fromISO(newDate)
    .plus({ hour: duration })
    .setLocale(locale)
    .toLocaleString(DateTime.TIME_24_SIMPLE);
}

export function formatEndDate(date, duration) {
  let newDate = date;
  return DateTime.fromISO(newDate).plus({ hour: duration }).toISO();
  // .toLocaleString(DateTime.TIME_24_SIMPLE);
}

const edjsHTML = (function () {
  "use strict";
  var e = {
    delimiter: function () {
      return `
      <div class="text-center py-3">
        <img src="/img/arrow.png" alt="Separator" />
      </div>`;
    },

    header: function (e) {
      var t = e.data;
      return (
        // "<h" + t.level + ">" + t.text + "</h" + t.level + ">"
        "<h" +
        t.level +
        ">" +
        sanitizeHtml(t.text, {
          allowedTags: ["font", "b", "i"],
          allowedAttributes: {
            font: ["color", "data-*"],
          },
        }) +
        "</h" +
        t.level +
        ">"
      );
    },
    paragraph: function (e) {
      // return "<p>" + e.data.text + "</p>";
      return (
        "<p>" +
        sanitizeHtml(e.data.text, {
          allowedTags: ["font", "b", "i", "a"],
          allowedAttributes: {
            font: ["color", "data-*"],
            a: ["href", "name", "target"],
          },
        }) +
        "</p>"
      );
    },
    list: function (e) {
      var t = e.data,
        r = "unordered" === t.style ? "ul" : "ol",
        n = function (e, t) {
          var r = e.map(function (e) {
            if (!e.content && !e.items)
              return (
                "<li>" +
                sanitizeHtml(e, {
                  allowedTags: ["font", "b", "i", "a"],
                  allowedAttributes: {
                    font: ["color", "data-*"],
                    a: ["href", "name", "target"],
                  },
                }) +
                "</li>"
              );
            var r = "";
            return (
              e.items && (r = n(e.items, t)),
              e.content
                ? "<li> " +
                  sanitizeHtml(e.content, {
                    allowedTags: ["font", "b", "i", "a"],
                    allowedAttributes: {
                      font: ["color", "data-*"],
                      a: ["href", "name", "target"],
                    },
                  }) +
                  " </li>" +
                  r
                : void 0
            );
          });
          return "<" + t + ">" + r.join("") + "</" + t + ">";
        };
      return n(t.items, r);
    },
    image: function (e) {
      var t = e.data,
        r = t.caption ? t.caption : "";
      return (
        '<img class="img-fluid" src="' +
        (t.file && t.file.url ? t.file.url : t.url) +
        '" alt="' +
        r +
        '" />' +
        (r && "<p class='text-secondary-400'><em>" + r + "</em></p>")
      );
    },
    // mediaLib: function (e) {
    //   var t = e.data,
    //     r = t.caption ? t.caption : "";
    //   return (
    //     '<img class="img-fluid" src="' +
    //     (t.file && t.file.url ? t.file.url : t.url) +
    //     '" alt="' +
    //     r +
    //     '" />' +
    //     (r && "<p class='text-secondary-400'><em>" + r + "</em></p>")
    //   );
    // },
    quote: function (e) {
      var t = e.data;
      return (
        "<blockquote>" +
        t.text +
        "</blockquote>" +
        "<i class='mb-2 mt-n2 d-block'>" +
        t.caption +
        "</i>"
      );
    },
    code: function (e) {
      return "<pre><code>" + e.data.code + "</code></pre>";
    },
    embed: function (e) {
      var t = e.data;
      switch (t.service) {
        case "vimeo":
          return (
            '<div class="embed-container"> <iframe src="' +
            t.embed +
            '" height="' +
            t.height +
            '" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe> </div>'
          );
        case "youtube":
          return (
            '<div class="embed-container"> <iframe width="' +
            t.width +
            '" height="' +
            t.height +
            '" src="' +
            t.embed +
            '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div>'
          );
        default:
          console.log("Only Youtube and Vime Embeds are supported right now.");
          return;
      }
    },
  };
  function t(e) {
    // return new Error(
    //   '[31m The Parser function of type "' +
    //     e +
    //     '" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m'
    // );
    console.log(
      'The Parser function of type "' +
        e +
        '" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m'
    );
  }
  var r = function (n) {
    void 0 === n && (n = {});
    var i = Object.assign({}, e, n);
    return {
      parse: function (e) {
        return e.blocks.map(function (e) {
          return i[e.type] ? i[e.type](e) : t(e.type);
        });
      },
      parseBlock: function (e) {
        return i[e.type] ? i[e.type](e) : t(e.type);
      },
      parseStrict: function (e) {
        var n = e.blocks,
          o = r(i).validate({ blocks: n });
        if (o.length)
          throw new Error(
            "Parser Functions missing for blocks: " + o.toString()
          );
        for (var u = [], a = 0; a < n.length; a++) {
          if (!i[n[a].type]) throw t(n[a].type);
          u.push(i[n[a].type](n[a]));
        }
        return u;
      },
      validate: function (e) {
        var t = e.blocks
            .map(function (e) {
              return e.type;
            })
            .filter(function (e, t, r) {
              return r.indexOf(e) === t;
            }),
          r = Object.keys(i);
        return t.filter(function (e) {
          return !r.includes(e);
        });
      },
    };
  };
  return r;
})();

const edjsParser = edjsHTML();
export const parseEditorJS = (data) => {
  let html = edjsParser.parse(JSON.parse(data));
  let htmlString = html.join("");
  // return htmlString;
  return (
    <div
      className="editorjs-content"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    ></div>
  );
};

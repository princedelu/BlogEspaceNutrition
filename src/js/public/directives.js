(function(){
"use strict";

angular.module('BlogEspaceNutrition').directive('commentaires', function($location) {
    return {
        link: function(scope, element, attrs) {
            var $element = $(element);
			var articleId = fyre.conv.load.makeArticleId($location.absUrl());
			var customStrings = {
				signIn: "Identification",
		        signInGuest: "Se connecter en invit\u00e9",
		        signOut: "D\u00e9connexion",
		        editProfile: "\u00c9diter le profil",
		        siteAdmin: "Administration",
		        postButton: "Poster",
		        postAsButton: "Poster en tant que",
		        postEditButton: "\u00c9diter",
		        postEditCancelButton: "Annuler",
		        commentCountLabel: "commentaire",
		        commentCountLabelPlural: "commentaires",
		        listenerCountLabel: "abonn\u00e9",
		        listenerCountLabelPlural: "abonn\u00e9s",
		        likeButton: "J'aime",
		        unlikeButton: "J'aime pas",
		        editButton: "\u00c9diter",
		        replyButton: "R\u00e9pondre",
		        follow: "S'abonner",
		        unfollow: "Se d\u00e9sabonner",
		        banUserButton: "Bannir",
		        deleteButton: "Supprimer",
		        flagButton: "Marquer",
		        shareButton: "Partager",
		        sortNewest: "Les plus r\u00e9cents",
		        sortOldest: "Les plus anciens",
		        sortLabel: "Ordre",
		        sortSeparator: " ",
		        banTitle: "Bannir l'utilisateur",
		        banConfirmation: "\u00cates-vous sur de vouloir bannir cet utilisateur ?",
		        banConfirmButton: "OK",
		        banCancelButton: "Annuler",
		        flagSpam: "Spam",
		        flagOffensive: "Offensant",
		        flagDisagree: "D\u00e9saccord",
		        flagOffTopic: "Hors-sujet",
		        flagTitle: "Le sujet de %s",
		        flagSubtitle: "Marquer comme",
		        flagEmail: "Email",
		        flagEmailPlaceholder: "vous@exemple.org",
		        flagNotes: "Notes",
		        flagNotesPlaceholders: "Votre commentaire ici",
		        flagConfirmButton: "OK",
		        flagCancelButton: "Annuler",
		        flagSuccessMsg: "Le message a bien \u00e9t\u00e9 marqu\u00e9",
		        shareDefaultText: "Tu devrais lire ce commentaire !",
		        shareTitle: "Partager le commentaire",
		        shareButtonText: "Partager",
		        shareLabel: "Partager sur :",
		        sharePermalink: "Permalien",
		        mentionTitle: "Partager la mention",
		        mentionSubtitleFacebook: "Partager ce commentaire Facebook \u00e0 :",
		        mentionSubtitleTwitter: "Partager ce commentaire Twitter \u00e0 :",
		        mentionDefaultText: "Je t'ai mentionn\u00e9 dans un commentaire",
		        mentionConfirmButton: "OK",
		        mentionCancelButton: "Annuler",
		        mentionSuccessMsg: "La mention a bien \u00e9t\u00e9 partag\u00e9e",
		        mentionErrorNoneSelected: "Aucun pseudo n'a \u00e9t\u00e9 selectionn\u00e9",
		        mentionErrorGeneral: "Erreur lors de l'envoi du partage de mention. Veuillez r\u00e9essayer ult\u00e9rieurement",
		        timeJustNow: "\u00e0 l'instant",
		        timeMinutesAgo: "minute plus t\u00f4t",
		        timeMinutesAgoPlural: "minutes plus t\u00f4t",
		        timeHoursAgo: "heure plus t\u00f4t",
		        timeHoursAgoPlural: "%s heures plus t\u00f4t",
		        timeDaysAgo: "jour plus t\u00f4t",
		        timeDaysAgoPlural: "jours plus t\u00f4t",
		        errorAuthError: "Erreur lors de l'authentification",
		        errorCommentsNotAllowed: "Commentaire non autoris\u00e9",
		        errorDuplicate: "M\u00eame si vous aimez votre commentaire, vous n'\u00eates pas autoris\u00e9 \u00e0 le publier deux fois",
     		    errorEditDuplicate: "Vous ne pouvez pas \u00e9diter ce commentaire",
		        errorEditNotAllowed: "L'\u00e9dition du commentaire n'est pas autoris\u00e9",
		        errorEmpty: "Votre commentaire est vide. Veuillez r\u00e9diger un message",
		        errorInsufficientPermissions: "Vous n'avez pas les droits suffisants pour effectuer cette op\u00e9ration",
		        errorInvalidChar: "Des caract\u00e8res non-autoris\u00e9s se sont gliss\u00e9s dans votre message, revoyez votre copie ;)",
		        errorLikeOwnComment: "Vous ne pouvez aimer votre propre commentaire.",
		        errorMalformed: "Le contenu de votre commentaire n'est pas valide, revoyez votre copie ;)",
		        errorMaxChars: "Votre commentaire d\u00e9passe la limite de caract\u00e8res autoris\u00e9e.",
		        errorExpired: "Session expir\u00e9e. Veuillez rafra\u00eechir cette page",
		        errorDefault: "Une erreur s'est produite, veuillez renouveler l'op\u00e9ration ult\u00e9rieurement"
			};
			var convConfig = {};
			convConfig.strings= customStrings;
			fyre.conv.load({}, [convConfig,{
				el: 'livefyre-comments',
				network: "livefyre.com",
				siteId: "380803",
				articleId: articleId,
				signed: false,
				collectionMeta: {
				    articleId: articleId,
				    url: fyre.conv.load.makeCollectionUrl($location.absUrl(), [], true),
				}
			}], function() {});
        }
    };
});

})();
